<!-- Source: https://developers.zoom.us/docs/video-sdk/auth.md -->
<!-- Fetched: 2026-10-15 -->

# Authorize


Zoom Video SDKs use [JSON Web Tokens (JWT)](https://datatracker.ietf.org/doc/html/rfc7519) for authorization to start and join sessions. Generate a Video SDK JWT using your Video SDK credentials.

Only your Video SDK account can start and join your sessions. Other Video SDK accounts cannot join your sessions, and the Video SDK cannot join Zoom Meetings or Webinars.

    <JWTGenerator appType="video" />


    Use the [Video SDK auth endpoint sample](https://github.com/zoom/videosdk-auth-endpoint-sample) to generate a Video SDK JWT securely, then start or join sessions for [your chosen platform](#pick-a-platform-and-get-started).

## Generate a Video SDK JWT

In [Platform Studio](https://platform.zoom.us), under **SDK credentials**, get your **SDK Key** and **SDK Secret**. Use these credentials to generate your Video SDK JWT on a secure server-side environment.

A JWT consists of three parts: **Header**, **Payload**, and **Signature**.

### Header

The header specifies the signing algorithm and the token type.

| Key   | Value   |
| ----- | ------- |
| `alg` | `HS256` |
| `typ` | `JWT`   |

**Sample header**

```javascript
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### Payload

The payload contains the token claims, user information, and required metadata.

| Key                                 | Required                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app_key`                           | Yes                          | Your Video SDK key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `role_type`                         | Yes                          | The user role. `1` = host or co-host. `0` = participant. Participants can join before the host. Must be a number.                                                                                                                                                                                                                                                                                                                                                                        |
| `tpc`                               | Yes                          | The Video SDK session name (max 200 characters). Supports alphanumeric characters, spaces, and standard visible symbols (`!`, `#`, `$`, `%`, `&`, `(`, `)`, `+`, `-`, `:`, `;`, `<`, `=`, `.`, `>`, `?`, `@`, `[`, `]`, `^`, `_`, `{`, `}`, &#124;, `~`, `,`, `\`). Must match the session `join` context value. Case-insensitive (converted to lowercase).                                                                                                                              |
| `version`                           | Yes                          | Set to `1`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `iat`                               | Yes                          | Token issuance timestamp.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `exp`                               | Yes                          | Token expiration timestamp (epoch). Must be ≥ 1800 seconds after `iat` and ≤ 48 hours after `iat`.                                                                                                                                                                                                                                                                                                                                                                                       |
| `user_key`                          | Optional                     | A unique identifier you assign to the user (max 36 characters). Also used in [Video SDK APIs](/docs/api/video-sdk/#tag/sessions/GET/videosdk/sessions), [Dashboard](/docs/build/dashboard/), and SDK interfaces. Set a unique value per customer or user segment to [audit usage](#audit-usage-with-user_key). [Previously named `user_identity`](/changelog/video-sdk/android/2.4.12#added) in the SDK.                                                                                 |
| `session_key`                       | Optional/<br></br>Required\* | \*If set by the host. Identifies the session (max 36 characters) in the [Video SDK APIs](/docs/api/video-sdk/#tag/sessions/GET/videosdk/sessions) and [Dashboard](/docs/build/dashboard/). All attendees must supply the same value if the host sets it.                                                                                                                                                                                                                                 |
| `geo_regions`                       | Optional                     | Comma-separated data center connection [region](/docs/api/references/abbreviations/#countries) preferences for the user joining the session. Must also be enabled in your [account](/docs/build/account/#data-configuration-customize-data-center-regions). Supported values: `AU`, `BR`, `CA`, `DE`, `HK`, `IN`, `JP`, `CN`, `MX`, `NL`, `SG`, `US`.                                                                                                                                    |
| `cloud_recording_option`            | Optional                     | `0` (default) one combined video. `1` separate video file per user. `2` individual source tracks (ISO) and regular (active/gallery) cloud recordings simultaneously. Requires host privileges (`role_type = 1`) and a Zoom Build Platform universal credit account.                                                                                                                                                                                                                      |
| `cloud_recording_election`          | Optional                     | `1` to record the user's self-view, otherwise `0` (default).                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `telemetry_tracking_id`             | Optional                     | For [sending basic client telemetry (Web SDK only)](/docs/video-sdk/web/quality/#set-a-tracking-id).                                                                                                                                                                                                                                                                                                                                                                                     |
| `video_webrtc_mode`                 | Optional\*                   | Web 2.x+. `0` = disable WebRTC video, `1` = enable. Zoom may choose automatically if omitted. \*On browsers that do not support WebRTC video, Zoom will use WebAssembly video.                                                                                                                                                                                                                                                                                                           |
| `audio_webrtc_mode`                 | Optional\*                   | Web only. `1` to enable WebRTC audio. Replaces `audio_compatible_mode`. If you do not define this value in the JWT, Zoom determines whether to enable WebRTC audio based on various factors determined by Zoom at the time. \*On mobile browsers Zoom always uses WebRTC audio.                                                                                                                                                                                                          |
| `cloud_recording_transcript_option` | Optional                     | `0` = (default) none, `1` = transcript only, `2` = transcript + summary. Requires a Zoom Build Platform universal credit account.                                                                                                                                                                                                                                                                                                                                                        |
| `hold`                              | Optional                     | OnHold support for the session. `0` = (default) the session does not support OnHold. `1` = OnHold is on, and participants wait on hold until a host or manager admits them. `2` = OnHold is supported but off, and a host or manager can turn it on during the session. Set this value in the JWT of the first user to join. `1` and `2` require Video SDK 2.6.11 or later on every client. Must be a number. See [Hold participants until admitted](#hold-participants-until-admitted). |

**Sample payload**

```javascript
{
  "app_key": ZOOM_VIDEO_SDK_KEY,
  "role_type": ROLE,
  "tpc": SESSION_NAME,
  "version": 1,
  "iat": 1646937553,
  "exp": 1646944753,
  "user_key": USER_KEY,
  "session_key": SESSION_KEY,
  "geo_regions": "US,AU,CA,IN,CN,BR,MX,HK,SG,JP,DE,NL",
  "cloud_recording_option": 0,
  "cloud_recording_election": 0,
  "telemetry_tracking_id": "",
  "video_webrtc_mode": 0,
  "audio_webrtc_mode": 1,
  "cloud_recording_transcript_option": 0,
  "hold": 0
}
```

### Signature

The signature is generated by signing the header and payload using your Video SDK secret and the HMAC SHA256 algorithm.

**Sample signature**

```javascript
HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    ZOOM_VIDEO_SDK_SECRET,
);
```

**Sample Video SDK JWT**

```plaintext
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Sample code (Node.js)

The Node.js sample code below shows how to generate a Video SDK JWT using [jsrsasign](https://www.npmjs.com/package/jsrsasign), an open source cryptographic JavaScript library. For additional JWT libraries and code samples in more languages, see [JWT.io](https://jwt.io/libraries).

Commented out properties are optional for all platforms.

```javascript
import { KJUR } from "jsrsasign";

const iat = Math.floor(Date.now() / 1000) - 30;
const exp = iat + 60 * 60 * 2;

const payload = {
    app_key: process.env.ZOOM_SDK_KEY,
    tpc: "My Session",
    role_type: 0,
    version: 1,
    iat: iat,
    exp: exp,

    // session_key: "my-session",
    // user_key: "user-123",
    // geo_regions: "",
    // cloud_recording_option: 0,
    // cloud_recording_election: 0,
    // telemetry_tracking_id: "",
    // video_webrtc_mode: 0,
    // audio_webrtc_mode: 1,
    // hold: 0
};

const token = KJUR.jws.JWS.sign(
    "HS256",
    JSON.stringify({ alg: "HS256", typ: "JWT" }),
    JSON.stringify(payload),
    process.env.ZOOM_SDK_SECRET,
);

console.log(token);
```

## Start and join sessions

Use the generated JWT to start or join a Video SDK session.

**Session passwords may be up to 10 characters and must consist of visible alphanumeric and standard keyboard special characters (`ch >= 32 && ch < 127`).**

```kotlin
val params = ZoomVideoSDKSessionContext()
params.sessionName = "My session name"
params.userName = "My Name"
params.sessionPassword = "My session passcode"
params.token = "" // Your Video SDK JWT
val session = ZoomVideoSDK.getInstance().joinSession(params)
```

```swift
let sessionContext = ZoomVideoSDKSessionContext()
sessionContext.sessionName = "My session name"
sessionContext.userName = "My name"
sessionContext.sessionPassword = "My session passcode"
sessionContext.token = "" // Your Video SDK JWT
ZoomVideoSDK.shareInstance()?.joinSession(sessionContext)
```

```swift
let sessionContext = ZMVideoSDKSessionContext()
sessionContext.sessionName = "My session name"
sessionContext.userName = "My name"
sessionContext.sessionPassword = "My session passcode"
sessionContext.token = "" // Your Video SDK JWT
ZMVideoSDK.shared()?.joinSession(sessionContext)
```

```javascript
await zoom.joinSession({
    sessionName: "My session name",
    userName: "My name",
    sessionPassword: "My session passcode",
    token: "", // Your Video SDK JWT
    audioOptions: { connect: true, mute: false },
    videoOptions: { localVideoOn: true },
});
```

```javascript
client
    .join(topic, token, userName, password)
    .then(() => {
        const stream = client.getMediaStream();
    })
    .catch(console.error);
```

```cpp
ZoomVideoSDKSessionContext sessionContext;
sessionContext.sessionName = L"My session name";
sessionContext.userName = L"My name";
sessionContext.sessionPassword = L"My session passcode";
sessionContext.token = L""; // Your Video SDK JWT
IZoomVideoSDKSession* pSession = m_pVideoSDK->joinSession(sessionContext);
```

See the [platform-specific Video SDK documentation](/docs/video-sdk/#platforms) for more details.

## Audit usage with user_key

The `user_key` payload field assigns a unique identifier that you define to each of your end users. It differs from the other identifiers in the payload: `tpc` is the session name and `session_key` identifies a session, while `user_key` identifies an individual user. You control the value, so you can map it to your own customer or user segment.

Set a stable, unique `user_key` per customer or user segment when you generate the JWT. Each distinct `user_key` is then individually identifiable in Zoom usage reporting, which lets you track and audit Video SDK usage by your own customers.

`user_key` values are queryable in [Build Platform reports](/docs/build/reports/), the [Build Platform dashboard](/docs/build/dashboard/), and the [Video SDK sessions API](/docs/api/video-sdk/#tag/sessions/GET/videosdk/sessions).

> **Tip**
>
> Use `user_key` to audit Video SDK usage by customer or user segment. Assign each of your customers a unique `user_key` so you can track their activity separately in usage reports.

The following snippet sets `user_key` to a stable identifier you define when generating the JWT payload.

```javascript
const payload = {
    app_key: process.env.ZOOM_SDK_KEY,
    tpc: "My Session",
    role_type: 0,
    version: 1,
    iat: iat,
    exp: exp,

    // A stable identifier you assign per customer or user segment.
    user_key: "customer-acme-001",
};
```

## Hold participants until admitted

Use the `hold` payload field to place participants on hold when they join a session. Participants on hold stay outside the session until a host or manager admits them. The `hold` value in the JWT of the first user to join, which starts the session, determines whether the session supports OnHold.

-   `0` - (default) The session does not support OnHold. Clients that do not support OnHold can join.
-   `1` - The session supports OnHold, and OnHold is on when the session starts.
-   `2` - The session supports OnHold, but OnHold is off when the session starts. A host or manager can turn it on during the session.

When OnHold is on, participants who join receive `onHoldJoined()` instead of `onSessionJoin()` until a host or manager admits them. Hosts and managers receive a callback when users are placed on hold, and can admit users one at a time or all at once.

After the session starts, a host or manager can call `enableHold(true)` or `enableHold(false)` to turn OnHold on or off. This change only affects future join attempts. It does not admit users who are already on hold. To check whether the current session supports OnHold, call `isSupportHold()`.

The following snippet starts a session with OnHold on.

```javascript
const payload = {
    app_key: process.env.ZOOM_SDK_KEY,
    tpc: "My Session",
    role_type: 1,
    version: 1,
    iat: iat,
    exp: exp,

    // Place participants on hold until a host or manager admits them.
    hold: 1,
};
```

If you create sessions with the [Create a session API](/docs/api/video-sdk/#tag/sessions/POST/videosdk/sessions), set `settings.hold` in the request body. It accepts the same values as the `hold` payload field.

> **Note**
>
> OnHold requires Video SDK 2.6.11 or later on Android, iOS, macOS, Windows, and Linux. The Video SDK for React Native, Flutter, Unity, and Electron supports OnHold in versions built on Video SDK 2.6.11 or later. The Video SDK for Web does not support OnHold yet.
>
> When `hold` is `1` or `2`, the session rejects join attempts from clients that do not support OnHold, including Web clients. Update every client that joins the session before you turn on OnHold.

For platform-specific instructions, see the sessions page for [Android](/docs/video-sdk/android/sessions/#hold-participants-until-admitted), [iOS](/docs/video-sdk/ios/sessions/#hold-participants-until-admitted), [macOS](/docs/video-sdk/macos/sessions/#hold-participants-until-admitted), [Windows](/docs/video-sdk/windows/sessions/#hold-participants-until-admitted), or [Linux](/docs/video-sdk/linux/sessions/#hold-participants-until-admitted).

## Troubleshoot SDK JWT issues

If you have issues generating or using your SDK JWT, ensure that:

1. Your account is licensed for the Video SDK.
2. You're using the correct app credentials.
3. The JWT is signed with your Video SDK secret.
4. The `tpc` value matches the session name in the join context and is under 200 characters.
5. `exp` is ≤ 48 hours after `iat`.
6. `exp` is ≥ 1800 seconds after `iat`.
