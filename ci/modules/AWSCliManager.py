import subprocess
import re

class AWSCliManager:
  def __init__(self, bucket, indir, outdir, prID, cleanOutput=True, dryRun=True, debug=False):
    self.bucket = bucket
    self.indir = indir
    self.cleanOutput = cleanOutput
    self.dryRun = dryRun
    self.debug = debug

    self.outdir = outdir if prID is None else '%s/pr-%s' % (outdir, prID)

  def getFullBucket(self):
    return 's3://%s%s/' % (self.bucket, self.outdir)

  def getSimpleBucket(self):
    return 's3://%s/' % self.bucket

  def appendS3Args(self, args):
    if self.dryRun :
      args.append('--dryrun')
    if self.debug :
      args.append('--debug')
    return args

  def deployFiles(self):

    if self.cleanOutput:
      cleanArgs = [
        'aws',
        's3',
        'rm',
        self.getSimpleBucket(),
        '--recursive',
        '--exclude',
        'pr-*/*',
        '--exclude',
        '*sureroute-test-object.html',
        '--exclude',
        'akamai/*'
      ]
      cleanArgs = self.appendS3Args(cleanArgs)
      exitcode = subprocess.call(cleanArgs)
      if exitcode != 0:
        return exitcode

    args = [
      'aws',
      's3',
      'cp',
      self.indir,
      self.getFullBucket(),
      '--recursive',
      '--acl',
      'public-read'
    ]

    args = self.appendS3Args(args)
    return subprocess.call(args[:])


  def getDeploymentUrl(self):
    return 'http://%s%s' % (self.bucket, self.outdir)

  def cleanupPRFolders(self, prLimit):
    args = [
      'aws',
      's3',
      'ls',
      self.getSimpleBucket()
    ]

    if self.debug :
      args.append('--debug')

    p = subprocess.Popen(args, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, err = p.communicate()
    exitcode = p.returncode

    print output
    print err

    if exitcode == 0:
      prFolders = re.findall('(pr-(\d+)\/)', output)
      if self.debug:
        print 'Found PR folders'
        print prFolders
      if len(prFolders) > 0:
        cleanArgs = [
          'aws',
          's3',
          'rm',
          self.getSimpleBucket(),
          '--recursive',
          '--exclude',
          '*'
        ]
        hasFolders = False
        for folder in prFolders:
          prId = int(folder[1])
          if (prLimit <= prId):
            print 'Skiping %s' % folder[0]
          else:
            hasFolders = True
            cleanArgs.append('--include')
            cleanArgs.append('%s*.*' % folder[0])
        cleanArgs = self.appendS3Args(cleanArgs)


        if hasFolders:
          exitcode = subprocess.call(cleanArgs)
        else:
          print 'No PR folders found'
      else:
        print 'No PR folders found'

    return exitcode
