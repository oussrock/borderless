import subprocess
from datetime import datetime
import os
import json
import sys

def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')

def computeTagName(tagPrefix):
  now = datetime.now()
  return '%s-%s' % (tagPrefix.upper(), now.strftime('%Y%m%d-%H%M%S'))

def pushTag(tagName):
  now = datetime.now()
  createArgs = [
    'git',
    'tag',
    '-a',
    tagName,
    '-m',
    '"Deployed at %s"' % now.strftime('%d/%m/%Y %H:%M:%S')
  ]
  exitcode = subprocess.call(createArgs)
  if exitcode == 0:
    pushArgs = [
      'git',
      'push',
      'origin',
      tagName
    ]
    exitcode = subprocess.call(pushArgs)
  else:
    print 'Failed to create tag'
  return exitcode

def getTag(envName):
  print ['git', 'describe', '--tags', '--match', envName.upper() + '@*', '--abbrev=0']
  return subprocess.check_output([
    'git', 'describe', '--tags', '--match', envName.upper() + '@*', '--abbrev=0'
  ]).strip('\n')

def commonParserOptions(parser):
  # Extra options arguments
  parser.add_argument('--dry-run',
                      dest='dryRun', type=str2bool, nargs='?',
                        const=True, default=True,
                      help='run dry run mode')
  parser.add_argument('-d', '--debug',
                      dest='debug', type=str2bool, nargs='?',
                        const=True, default=False,
                      help='run on debug mode')
  return parser

def awsParserOptions(parser):
  parser = commonParserOptions(parser)
  # AWS arguments
  parser.add_argument('-b', '--aws-bucket', metavar='BUCKET',
                      dest='awsBucket', required=True,
                      help='The AWS bucket to be used')
  parser.add_argument('-r', '--aws-region', metavar='REGION',
                      dest='awsRegion', default='us-east-2',
                      help='The AWS region')
  return parser

def setAWSConfig(parser):
  options = parser.parse_args()

  access_key = 'DIGITALOPS_' + options.env + '_CICD_USER_AWS_ACCESS_KEY';
  access_secret_key = 'DIGITALOPS_' + options.env + '_CICD_USER_AWS_SECRET_ACCESS_KEY';
  assume_role_key = 'DIGITALOPS_' + options.env + '_CICD_ROLE_ARN';

  os.environ['AWS_ACCESS_KEY_ID'] = os.environ[access_key]
  os.environ['AWS_SECRET_ACCESS_KEY'] = os.environ[access_secret_key]
 
  creds = getAWSAssumeRole(assume_role_key)
  os.environ['AWS_ACCESS_KEY_ID'] = creds['AccessKeyId']
  os.environ['AWS_SECRET_ACCESS_KEY'] = creds['SecretAccessKey']
  os.environ['AWS_SESSION_TOKEN'] = creds['SessionToken']
  
  os.environ['AWS_DEFAULT_REGION'] = options.awsRegion

  return options

def getAWSAssumeRole(assume_role_key):
  credArgs = [
     'aws',
     'sts',
     'assume-role',
     '--role-arn',
     os.environ[assume_role_key],
     '--role-session-name',
     'AWSCLI-Session'
  ]
  result = subprocess.check_output(credArgs)    
  
  try:
    creds = json.loads(result)['Credentials']
    return creds
  except:
    print 'unable to get AWS credentials'
    exit

def jFrogParserOptions(parser):
  parser = commonParserOptions(parser)
  parser.add_argument('-j', '--jfrog-pwd', metavar='SECRET_KEY',
                      dest='jFrogPwd',
                      help='The Jfrog Encoded password. Can be also defined on JFROG_PWD environment variable')
  return parser

def setJFrogConfig(parser):
  options = parser.parse_args()

  if options.jFrogPwd is not None:
    os.environ['JFROG_PWD'] = options.jFrogPwd

  return options

def getNewName(env, name):
  return name + '-' + env.lower()

def updatePackageFile(env, newVersion):
  with open("package.json", "r") as jsonFile:
    data = json.load(jsonFile)

  newName = getNewName(env, data['name'])
  data['name'] = newName
  newVersion = newVersion.split('@')[1]
  data['version'] = newVersion
  data['private'] = False
  print 'New package name and version: ' + newName + ' / ' + newVersion

  with open("package.json", "w") as jsonFile:
    json.dump(data, jsonFile)

def publishPackage(options):

  # Set npm config!
  authRegistry = "digitalforairlines.jfrog.io/digitalforairlines/api/npm/npm-ac/"
  npmRegistry = "https://digitalforairlines.jfrog.io/digitalforairlines/api/npm/npm-ac/"

  # Set password
  pwdCmd = ['npm', 'config', 'set', '//%s:_password=%s' % (authRegistry, os.environ['JFROG_PWD'])]
  output = subprocess.call(pwdCmd)
  if output != 0:
    print 'Error while setting the config'
    return output
  # Publish the package
  publishCmd = ['npm', 'publish', '--registry', npmRegistry]
  if (options.dryRun):
    publishCmd += ['--dry-run']
  output = subprocess.call(publishCmd)
  return output

def saveEnv(env):
  f = open('.env', 'w+')
  f.write(env)
  f.close()

def getEnvFromFile():
  f = open('.env', 'r')
  lines = f.readlines()
  return lines[0]
