// Copyright Epic Games, Inc. All Rights Reserved.

import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.3';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.3';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

// AgoraRTC の設定
const APP_ID = "26356e4789c3407caf8e2b3d168d41b5";
const channelName = "test";
const uid = Math.floor(Math.random() * 100000);

import AgoraRTC, { ILocalAudioTrack, IRemoteAudioTrack } from "agora-rtc-sdk-ng";

let client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
let localAudioTrack: ILocalAudioTrack;


document.body.onload = function() {
	// Example of how to set the logger level
	// Logger.SetLoggerVerbosity(10);

	// Create a config object
	const config = new Config({ useUrlParams: true });

	// Create a Native DOM delegate instance that implements the Delegate interface class
	const stream = new PixelStreaming(config);

	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode)
	});
	// document.getElementById("centrebox").appendChild(application.rootElement);
	document.body.appendChild(application.rootElement);
}

// joinVoice を押したときの処理
document.getElementById("joinVoice")!.onclick = async () => {
	//const token = await fetch("/token?uid=" + uid).then(r => r.text());
	const token = await fetch(`http://localhost:3000/token?uid=${uid}`).then(r => r.text());
	await client.join(APP_ID, channelName, token, uid);
	localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
	await client.publish([localAudioTrack]);
};
client.on("user-published", async (user, mediaType) => {
	const remoteTrack = await client.subscribe(user, mediaType);
	if (mediaType === "audio") {
		(remoteTrack as IRemoteAudioTrack).play();
	}
});