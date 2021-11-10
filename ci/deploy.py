#!/usr/bin/env python

import sys
import argparse
import subprocess
import os

from modules.AWSCliManager import AWSCliManager
from modules.utils import str2bool, computeTagName, pushTag, awsParserOptions, setAWSConfig, saveEnv

def main(argv):
  # CLI Options
  parser = argparse.ArgumentParser(description='Deployment script for React Base Project') #change project name here
  parser = awsParserOptions(parser)
    # CI arguments
  parser.add_argument('-p', '--pr-id', metavar='ID',
                      dest='prID',
                      help='The ID of the PR (if any)')
  parser.add_argument('-e', '--env', metavar='ENV',
                      dest='env',
                      help='The environment to be used')
  parser.add_argument('-o', '--out-dir', metavar='OUT',
                      dest='outDir',
                      help='The output directory')
  parser.add_argument('--skip-deploy',
                      dest='skipDeploy', type=str2bool, nargs='?',
                        const=True, default=False,
                      help='Skips the deploy')
  parser.add_argument('--skip-tag',
                      dest='skipTag', type=str2bool, nargs='?',
                        const=True, default=False,
                      help='Skips the tag creation')

  # Parse CLI
  options = setAWSConfig(parser)

  if options.env is None:
    options.env = os.environ['BITBUCKET_DEPLOYMENT_ENVIRONMENT'] if os.environ.get('BITBUCKET_DEPLOYMENT_ENVIRONMENT') is not None else 'unknown'

  saveEnv(options.env)

  if options.debug:
    print options

  if options.outDir:
    options.outDir = options.outDir[:-1]

  aws = AWSCliManager(
    bucket=options.awsBucket,
    indir='build',
    outdir=options.outDir,
    prID=options.prID,
    debug=options.debug,
    dryRun=options.dryRun
  )

  if not options.skipDeploy:
    print 'Deploying the files...'
    exitcode = aws.deployFiles()
  else:
    print 'Deployment skipped'
    exitcode = 0

  if exitcode != 0:
    print 'Deployment failed'
  else:
    if options.env.lower() != 'pr-dev' and not options.skipTag:
      tagExitCode = pushTag(computeTagName(options.env))
      if tagExitCode != 0:
        print 'Failed to push the tag'
    print 'Deployment succeeded: URL: %s' % aws.getDeploymentUrl().replace("-digital-aircanada-com", ".digital.aircanada.com") #update deployment url


  sys.exit(exitcode)

if __name__ == '__main__':
    main(sys.argv[1:])
