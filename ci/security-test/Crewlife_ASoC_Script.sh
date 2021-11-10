#!/bin/bash -xv
#set -x #Enable/Disable Debug Mode 

echo -e "\n                 =======>   Defining Variables   <======= \n"
executionStartTime="$(date +'%d_%m_%Y_%H%M%S')"
echo -e "*****   Execution Start Time="$executionStartTime"   *****"

executionDate="$(date +'%d-%b-%Y')"

#The following three ASoC Credentials are moved to environment variables
#ASoC_API_Key_Demo="c4b43936-de9d-a0b4-c35f-3b8206fb0c33"
#ASoC_API_Secret_Demo="GMkAn3J6RuMQrgTE4Lf6ZBMCQjVfBotp1l0dnsxaSQ4="	
#ASoC_AppID_Demo="31c3e10d-0a65-469e-96f5-2f5710a844a3"

ASoC_AppID_Crewlife="410d8769-c62d-4a94-b038-723a6328d893"   #Live - Uncomment for Live Execution
echo -e "*****   ASoC Application ID="$ASoC_AppID_Crewlife"   *****"

#AppScan API Swagger Path  # EU - https://cloud.appscan.com/eu/api/V2   #US - https://cloud.appscan.com/api/V2
AppScan_API_HomePath="https://cloud.appscan.com/api/V2"		#To be changed based on the ASoC license
echo -e "*****   ASoC URL="$AppScan_API_HomePath"   *****"

#Scan Name in ASoC
Application_Name="CrewLife_"$BITBUCKET_REPO_SLUG

ASoC_ScanName=$Application_Name"_SAST_"$executionDate
echo -e "*****   ASoC Scan Name="$ASoC_ScanName"   *****"

#ASoC_Client_Utility - Download, unzip and then generate IRX file using this utility
Download_ASoC_CLI_Tool="https://cloud.appscan.com/api/SCX/StaticAnalyzer/SAClientUtil?os=linux"	#To be changed for windows version
ASoC_Client_Utility_ToolName="saclientutil_"$executionStartTime".zip"
ASoC_Tool_FolderName="Tools/ASoC_CLI_Tool_"$executionStartTime
mkdir -p $ASoC_Tool_FolderName
ASOCTool_FilePath=$ASoC_Tool_FolderName"/"$ASoC_Client_Utility_ToolName

#appscan.sh file is used for unix system #appscan.bat is used for windows
AppScanShell_FilePath=$ASoC_Tool_FolderName"/SAClientUtil.*/bin/appscan.sh"

#ASoC Config File to define scope. Save under the current directory
AppScanConfig_FileName="ci/security-test/appscan_config.xml"

#To save all the IRX files under one folder
IRX_FolderName="IRX"
mkdir -p $IRX_FolderName
IRX_Filename="output_IRX_"$executionStartTime".irx"
IRX_Filepath="IRX/"$IRX_Filename
echo -e "*****   IRX Filepath="$IRX_Filepath"   *****"

#Save SAST Assessment Report
mkdir -p "Report"
Report_FolderName="Report"
HTML_ReportName=$Application_Name"_SAST_Report_"$executionStartTime".html"
HTMLReport_FilePath=$Report_FolderName"/"$HTML_ReportName
echo -e "*****   HTML Report Filepath="$HTMLReport_FilePath"   *****"

#Notify the status in MS Teams
REGEX1="High severity.*\"\>([0-9]+)\<.*Med"
REGEX2="Medium severity issues:.*right.\>([0-9]+)\<.*[Low|Total].*"
REGEX3="Low severity.*\"\>([0-9]+)\<.*Total"
REGEX4="Total security.*\"\>([0-9]+)\<"

Teams_Connector_URL="https://aircanada.webhook.office.com/webhookb2/dcf4a7ab-d807-4156-a817-a69234528ee1@491d83df-1091-40f8-bcf9-b112f9a35fcf/IncomingWebhook/7914a73986a340b5bdf5cfc40c835ae2/382a352f-b422-49fd-835e-3c2fd2381f64"

echo -e "                 ------------------------   End - Variables Defined   ------------------------"

#Download the ASoC Client Utility to generate IRX
echo -e "\n                 =======>   Pre-Requisite - Download the ASoC Client Utility and Generate IRX File   <=======\n"
curl $Download_ASoC_CLI_Tool -o $ASOCTool_FilePath							#Uncomment for live execution
echo -e "\n                 --------  End - The ASoC client utility tool has been downloaded as zip file  --------"
chmod -R +x $ASoC_Tool_FolderName
#Install Unzip package if not found
if ! command -v unzip &> /dev/null
then
    echo "Unzip package could not be found. Installing the Unzip package now..."
	sudo apt-get install unzip
fi

#Unzip and overwrite without prompt
unzip_Response=$(unzip -oqq $ASOCTool_FilePath -d $ASoC_Tool_FolderName)		#Uncomment for live execution
echo -e "*****  Unzip Tool Response:: \n " $unzip_Response
echo -e "\n                 --------   End -  The ASoC client utility tool has been unzipped under " $ASOCTool_FilePath "   --------\n"

#Generate IRX File using CLI Utility
$AppScanShell_FilePath prepare -c $AppScanConfig_FileName -d $IRX_FolderName -n $IRX_Filename 		#Uncomment for live execution
# Use the below for demo in local machine - Comment curl, unzip and the above line
#"Sample_CLI_IRX/SAClientUtil.8.0.1445/bin/appscan.sh" prepare -c "appscan_config.xml" -d $IRX_FolderName -n $IRX_Filename 	#To be commented - Enable this line for Demo
echo -e "\n                 --------   End -  IRX File Generated as "$IRX_Filepath"   *****\n"

# API No.1 - Login to ASoC using Key and Secret IDs  
echo -e "\n\n                 =======>   1. Login to ASoC   <=======\n"
loginResponse=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer undefined' -d '{"KeyId":"'$ASoC_API_Key'","KeySecret": "'$ASoC_API_Secret'"}' $AppScan_API_HomePath"/Account/ApiKeyLogin")    #Live - To be uncommented for Live execution

#loginResponse=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header 'Authorization: Bearer undefined' -d '{"KeyId":"'$ASoC_API_Key_Demo'","KeySecret": "'$ASoC_API_Secret_Demo'"}' $AppScan_API_HomePath"/Account/ApiKeyLogin")    #Demo - To be commented
echo -e "*****   Login Response::  ***** \n"$loginResponse "\n" 		

#Store the Token value and use it for authentication
login_token=$(echo $loginResponse | tr , '\n' | grep Token | awk -F ':' '{print $2}')
login_token=$(sed -e 's/^"//' -e 's/"$//' <<< $login_token)
if [[ -z "$login_token" ]]
	then
	echo -e "\n>>>>>>> ERROR: Invalid request in Login API::  ***** \n"  $loginResponse "\n"
	exit 0
else
	echo -e "*****   Authentication Token = " $login_token "   *****\n"  #To Be Commented
	echo -e "                 --------   End - Logged Into ASoC Successfully   --------"			 
fi

#API No.2 - Execute File Upload API
echo -e "\n\n                 =======>   2. Upload $Application_Name IRX File to ASoC   <=======\n"
fileUpload_Response=$(curl -X POST --header 'Content-Type: multipart/form-data' --header "Accept: application/json" --header "Authorization: Bearer $login_token" -F  "fileToUpload=@$IRX_Filepath" $AppScan_API_HomePath"/FileUpload" --http1.1)
echo -e "*****   IRX File Upload Response ::  ***** \n" $fileUpload_Response 		 

#Store the FileId value and use it for scan
uploadedFileId=$(echo $fileUpload_Response| tr , '\n' | grep FileId | awk -F ':' '{print $2}')
uploadedFileId=$(sed -e 's/^"//' -e 's/"$//' <<< $uploadedFileId)

if [[ -z "$uploadedFileId" ]]
	then
	echo -e "\n>>>>>>> ERROR: Upload IRX File Failed. Invalid request in Upload_IRXFile API ::  ***** \n "$fileUpload_Response
	exit 0
else
	echo -e "\n*****   uploadFileId = " $uploadedFileId "   *****"  
	echo -e "\n                 --------   End - IRX File Uploaded to ASoC   --------"		 
fi

#API No.3 - Perform SAST scan in ASoC 

echo -e "\n\n                 =======>   3. Initiate $Application_Name SAST Scan in ASoC   <=======\n"
staticScan_Response=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer $login_token" -d '{ "ApplicationFileId": "'$uploadedFileId'", "ScanName": "'$ASoC_ScanName'", "EnableMailNotification": true, "Locale": "en-US", "AppId": "'$ASoC_AppID_Crewlife'", "Execute": true, "FullyAutomatic": false, "Personal": false}' $AppScan_API_HomePath"/Scans/StaticAnalyzer")		#Live - Uncomment for live execution

#staticScan_Response=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer $login_token" -d '{ "ApplicationFileId": "'$uploadedFileId'", "ScanName": "'$ASoC_ScanName'", "EnableMailNotification": true, "Locale": "en-US", "AppId": "'$ASoC_AppID_Demo'", "Execute": true, "FullyAutomatic": false, "Personal": false}' $AppScan_API_HomePath"/Scans/StaticAnalyzer")		#Demo - To be commented

echo -e "\n*****   3. Perform Scan Response::  ***** \n"  $staticScan_Response  "\n"				
#Store the scanId value and use it for verifying scan status and create report
scanId=$(echo $staticScan_Response| tr , '\n' | grep ScanId | awk -F ':' '{print $2}')
scanId=$(sed -e 's/^"//' -e 's/"$//' <<< $scanId)
#scanId="98f40c38-1e3c-48be-8d0e-9d72486c4b1c"     		#Demo - To be commented

echo -e "*****   Static Scan ID = " $scanId "   *****" 

if [[ -z "$scanId" ]]
	then
	echo -e "\n>>>>>>> ERROR: $Application_Name SAST Scan Failed. Invalid request in Perform_SAST_Scan API ::  ***** \n "$staticScan_Response
	exit 0
else
	echo -e "\n                 --------   End - SAST scan has been initated successfully in ASoC   --------"
fi

#API No.4 - Verify Scan Execution Status - Wait until the scan execution has been completed and the Status is moved to Ready state
echo -e "\n\n                 =======>   4. Verify $Application_Name Scan Execution Status   <=======\n"
scanStatus="Not Ready"
flag=1
while :
	do
		executionStatus_Response=$(curl -X GET --header 'Accept: application/json' --header "Authorization: Bearer $login_token" $AppScan_API_HomePath"/Scans/"$scanId"/Executions")
		if [ $flag == 1 ]
			then
				echo -e "\n*****   Execution Status Response ::  ***** \n" $executionStatus_Response  		
		fi

		scanStatus=$(echo $executionStatus_Response| tr , '\n' | grep -w Status | awk -F ':' '{print $2}')
		scanStatus=$(sed -e 's/^"//' -e 's/"$//' <<< $scanStatus)
		echo -e "\n*****   Current Scan Status = " $scanStatus "   *****"
		
		if [[ -z "$scanStatus" ]]
			then
				echo -e "\n>>>>>>> ERROR: $Application_Name Scan Execution Failed. Invalid request in ExecuteScan API ::  ***** \n " $executionStatus_Response
				exit 0
		elif [[ "$scanStatus" ==  "Failed" ]]
			then
				echo -e "\n>>>>>>> ERROR: $Application_Name SAST scan execution has been failed due to invalid API request. Check the API response ::  ***** \n " $executionStatus_Response 
				exit 0
		elif [[ "$scanStatus" ==  "Ready" ]]
			then
				echo -e "\n                 --------    End - $Application_Name SAST scan has been performed successfully   --------"
				break
			else
				sleep 30
				echo -e "\n*****   Waiting for $Application_Name scan execution status to be Ready - Loop $flag ...   *****"
				((flag=flag+1))
		fi
	done

#API No.5 - Create ASoC SAST Security Scan Report
echo -e "\n\n                 =======>   5. Create $Application_Name ASoC SAST Security Scan Report   <=======\n"
generateReport_Response=$(curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' --header "Authorization: Bearer $login_token" -d '{"Configuration": {"Summary": true, "Details": true, "Discussion": true, "Overview": true, "TableOfContent": true, "Advisories": true, "FixRecommendation": true, "History": true, "Coverage": true, "MinimizeDetails": true, "Articles": true, "ReportFileType": "HTML", "Title": "ASoC_scanReport", "Locale": "en-US"} }' $AppScan_API_HomePath"/Reports/Security/Scan/"$scanId)
echo -e "*****   Generate Report Response::  ***** \n" $generateReport_Response     		 

#Save the ReportId and use it for verifying the ReporStatus API
reportID=$(echo $generateReport_Response| tr , '\n' | grep -w Id | awk -F ':' '{print $2}')
reportID=$(sed -e 's/^"//' -e 's/"$//' <<< $reportID)
echo -e "\n*****   Report ID = " $reportID    "  ***** "

if [[ -z "$reportID" ]]
	then
	echo -e "\n>>>>>>> ERROR: Invalid request in $Application_Name Create_Report API ::  ***** \n " $generateReport_Response
	exit 0
else
	echo -e "\n                 --------    End - ASoC $Application_Name SAST Security Report has been created. Now the status of report generation will be verified   --------"
fi
		
#API No.6 - Verify Report Generation Status	
echo -e "\n\n                 =======>   6. Verify Report Generation Status   <=======\n"	
reportStatus="Not Ready"
reportFlag=1
while :
	do		
		reportStatus_Response=$(curl -X GET --header 'Accept: application/json' --header "Authorization: Bearer $login_token" $AppScan_API_HomePath"/Reports/"$reportID)
		if [ $reportFlag == 1 ]
			then
				echo -e "\n*****   Verify Report Status Response ::  ***** \n" $reportStatus_Response 		
		fi
		
		reportStatus=$(echo $reportStatus_Response| tr , '\n' | grep -w Status | awk -F ':' '{print $2}')
		reportStatus=$(sed -e 's/^"//' -e 's/"$//' <<< $reportStatus)
		echo -e "\n*****   Current Report Generation Status = " $reportStatus "   *****"
		
		if [[ -z "$reportStatus" ]]
			then
				echo -e "\n>>>>>>> ERROR: $Application_Name Report Generation Failed. Invalid request in VerifyReportStatus API::  ***** \n "$reportStatus_Response
				exit 0
		elif [[ "$reportStatus" ==  "Failed" ]]
			then
				echo -e "\n>>>>>>> ERROR: $Application_Name Report generation has been failed due to invalid API request. Check the API response::  ***** \n "$reportStatus_Response
				exit 0
		elif [[ "$reportStatus" ==  "Ready" ]]
			then
				echo -e "\n                 --------    End - $Application_Name SAST Security Report has been generated   --------"
				break
			else
				sleep 10
				echo -e "\n*****   Waiting for $Application_Name security report generation status to be Ready - Loop $reportFlag ...   *****"
				((reportFlag=reportFlag+1))
		fi
	done
	
#API No.7 - Download ASoC Security Scan Report
echo -e "\n\n                 =======>   7. Download ASoC Security Scan Report   <=======\n"	
curl -X GET --header 'Accept: text/html' --header "Authorization: Bearer $login_token" $AppScan_API_HomePath"/Reports/Download/"$reportID -o $HTMLReport_FilePath
echo -e "\n                 --------    End - "$HTMLReport_FilePath" security report has been downloaded   --------\n"


#Notify the SAST Report status in MS Teams Channel
echo -e "\n\n                 =======>   Extract SAST Execution Report and Notify the Status in MS Teams Channel  <=======\n"	

function Extract_Defect_Counts {
PYTHON_ARG="$1" PYTHON_ARG2="$2" python3 - <<EOF
import os
import re
filename=os.environ['PYTHON_ARG']
regex=os.environ['PYTHON_ARG2']
textfile = open(filename, 'r')
filetext = textfile.read()
textfile.close()
matches = re.findall(regex, filetext)
if matches:
	print(matches[0])
else:
	print(0)
EOF
}


echo "High Severity Vulnerabilities"
HighSev=$(Extract_Defect_Counts "$HTMLReport_FilePath" "$REGEX1")
echo "$HighSev"
echo "Medium Severity Vulnerabilities"
MedSev=$(Extract_Defect_Counts "$HTMLReport_FilePath" "$REGEX2")
echo "$MedSev"
echo "Low Severity Vulnerabilities"
LowSev=$(Extract_Defect_Counts "$HTMLReport_FilePath" "$REGEX3")
echo "$LowSev"
echo "Total Vulnerabilities"
TotalSev=$(Extract_Defect_Counts "$HTMLReport_FilePath" "$REGEX4")
echo "$TotalSev"

echo -e "\n                 --------    End - Status of SAST execution report has been notified in MS Teams Channel   --------\n"

curl --location --request POST "$Teams_Connector_URL" --header 'Content-Type: application/json' --data-raw '{"@type": "MessageCard","@context": "http://schema.org/extensions","themeColor": "0076D7","summary": "DevSecOps Summary","sections": [{    "activityTitle": "CrewLife SAST Execution Summary",    "activitySubtitle": "Automated Message",    "activityImage": "https://spotbugs.github.io/images/logos/spotbugs_icon_only_zoom_256px.png",    "facts": [{        "name": "Description",        "value": "Static Application Security Testing (SAST) has been performed on the CrewLife source code located in the Bitbucket repository. Security testing team will coordinate with the developement team to assess and identify the false positives. The final vulnerability assessment report will be shared soon."}, {"name": "Execution Tool", "value": "HCL AppScan on Cloud" }, {"name": "SAST Execution Date", "value": "'$executionDate'"}, {"name": "Bitbucket Branch", "value": "'$BITBUCKET_WORKSPACE'/'$BITBUCKET_REPO_SLUG'/'$BITBUCKET_BRANCH'"}, {"name": "Bitbucket Commit ID", "value": "'$BITBUCKET_COMMIT'"}, {"name": "Source of Execution", "value": "Bitbucket Pipeline - #'$BITBUCKET_BUILD_NUMBER'"    }, {"name": "High Severity Issues","value": "'$HighSev'"    }, {"name": "Medium Severity Issues","value": "'$MedSev'"    }, {"name": "Low Severity Issues","value": "'$LowSev'"    } ],    "markdown": true}]}'

#set +x
echo -e "*****   Execution End Time=$(date +'%d_%m_%Y_%H%M%S')   *****"

