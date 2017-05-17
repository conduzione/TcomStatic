Manage your app
The web console is convenient, but if you need deeper control you may want to try our command line tools.
Command line tools
Download and install the oc command line tool. After that, you can start by logging in, switching to this particular project, and displaying an overview of it, by doing:
oc login https://api.starter-us-east-1.openshift.com
oc project conduzione-tcom-static
oc status
For more information about the command line tools, check the CLI Reference and Basic CLI Operations.
Making code changes
A GitHub webhook trigger has been created for the tcomstatic build config.
You can now set up the webhook in the GitHub repository settings if you own it, in https://github.com/conduzione/TcomStatic/settings/hooks, using the following payload URL:

https://api.starter-us-east-1.openshift.com/oapi/v1/namespaces/conduzione-tcom-static/buildconfigs/tcomstatic/webhooks/8ae60acb360b41b2/github