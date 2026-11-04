<!-- Source: https://developers.zoom.us/docs/video-sdk/web/sessions.md -->
<!-- Fetched: 2026-10-15 -->

# Sessions


A Video SDK session connects two or more users for realtime, two-way communication. Zoom creates sessions on demand; they don't need to be scheduled. You can run an unlimited amount of sessions concurrently. Up to 5,000 users can join a session. A user can be in one session per browser tab at a time.

[Install the Video SDK](/docs/video-sdk/web/get-started/), then start and join sessions to use video, audio, and other features. Once the session is over, leave or end it.

## Life cycle of a Video SDK experience

The life cycle of a Video SDK session includes the following stages for a successful user experience.

-   **Pre-session** - Things that should happen before a session starts.
-   **In session** - How to make the session state clear to users and handle any connection issues that may occur.
-   **Post-session** - How to make it clear to all users when they've left the session, when others have left the session, or that the session has ended, and how to clean up the Video SDK for post-session workflows or new session joins.

---

## Pre-session

Before you start development, be sure to use the [latest version](https://www.npmjs.com/package/@zoom/videosdk) of the Video SDK for the most recent improvements and bug fixes. We suggest highlighting to your users to always use the latest version of their device's operating system and the latest version of their browsers.

_**Angular framework note: Angular has an edge case with change detection where you must run the Video SDK outside the Angular zone. See [Using Angular](/docs/video-sdk/web/frameworks/#using-angular) for details.**_

### Audio, video, and network tests

-   Before joining a session, you can show a [preview flow](/docs/video-sdk/web/preview/) where you let the user test their camera, microphone, and speaker (if supported by the browser). This allows them to accept the browser permission of accessing their mic and camera, and can even allow them to pre-select which camera and microphone they'd like to use in the session.

    ![Audio, video, and speaker test screen](/img/uitk-web8-preview2b.png)

-   We also suggest adding a network strength test ([see example on Stack Overflow](https://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript/5529841#5529841)) to your preview page if you'd like to show the user their network strength to help set expectations of how the service quality will function.

    ![Network strength indicator](/img/vsdk-web-bp1.5-network.png)

    > You can also use [Zoom Probe SDK for web](/docs/probe-sdk/) to check if audio and video hardware, network, and Zoom infrastructure offers the best experience for your users.
    >
    > For example, integrate it into your solution to enable users to test their microphone, speaker, and video settings before joining a session, or to investigate customer issues such as as blurry video, choppy audio, and poor network connectivity.

### Preload assets and check support

Before you start a session, we recommend that you [preload the Zoom WebAssembly assets](https://marketplacefront.zoom.us/sdk/custom/web/modules/ZoomVideo.default.html#preloadDependentAssets) when the users first visit the webpage. This will make calling the `join` function must faster when the user joins the session, as the WebAssembly dependencies will already be ready. Be sure to [await the `init` function](/docs/video-sdk/web/get-started/#init-the-video-sdk) before calling the `join` function.

As a best practice, before calling the `init` function, we recommend that you check whether the device supports the core feature you are building for, like `video`, `audio`, or `screen` (screen sharing), by calling the `ZoomVideo.checkSystemRequirements()` function. See [browser support](/docs/video-sdk/web/browser-support/#check-device-or-browser-support) for details.

---

## In session: Start and join sessions

To start and join sessions, after you've installed the Video SDK, create the client, `init` the Video SDK, and declare a variable called `stream`. Then, call the `join` function and pass in a session name, [Video SDK JWT](/docs/video-sdk/auth/#generate-a-video-sdk-jwt), `username`, and `sessionPasscode`. After joining the session, define `stream` to `client.getMediaStream()`. You'll use this namespace to build out features.

```javascript
import ZoomVideo from "@zoom/videosdk";

var client = ZoomVideo.createClient();
var stream;

client.init("en-US", "Global", { patchJsMedia: true }).then(() => {
    client
        .join("sessionName", "VIDEO_SDK_JWT", "userName", "sessionPasscode")
        .then(() => {
            stream = client.getMediaStream();
        });
});
```

```javascript
import ZoomVideo from "@zoom/videosdk";

var client = ZoomVideo.createClient();
var stream;

await client.init("en-US", "Global", { patchJsMedia: true });
await client.join(
    "sessionName",
    "VIDEO_SDK_JWT",
    "userName",
    "sessionPasscode",
);

stream = client.getMediaStream();
```

-   The session begins when the first user joins.
-   The session name must match the `tpc` in the Video SDK JWT.
-   The host of the session is the user with a `role` set to `1` in the [Video SDK JWT](/docs/video-sdk/auth/).
-   The `sessionPasscode` is optional, but if set for a session, it's required for other users joining that session.

## `init` parameters and options

-   [`init`](https://marketplacefront.zoom.us/sdk/custom/web/modules/ZoomVideo.VideoClient.html#init) is a promise function that must resolve before resolving the `join` function. If you call the `join` function before the `init` function promise has resolved, the Video SDK won't work and will throw an error.
-   [`patchJsMedia`](https://marketplacefront.zoom.us/sdk/custom/web/interfaces/ZoomVideo.InitOptions.html#patchJsMedia) handles how the SDK updates Video SDK media dependencies. Set to `true` to automatically receive non-breaking enhancements and fixes. Note that you still must update to the latest version of the SDK to keep up with all enhancements and bug fixes.
-   [`stayAwake`](https://marketplacefront.zoom.us/sdk/custom/web/interfaces/ZoomVideo.InitOptions.html#stayAwake) prevents devices from sleeping while the user is in a session.
-   [`leaveOnPageUnload`](https://marketplacefront.zoom.us/sdk/custom/web/interfaces/ZoomVideo.InitOptions.html#leaveOnPageUnload) - removes the user from the session when they refresh or close the page, so that the user doesn't still appear to be in the session when they close the browser tab instead of pressing the button to leave the session.

See [`InitOptions`](https://marketplacefront.zoom.us/sdk/custom/web/interfaces/ZoomVideo.InitOptions.html) for more.

## `join` parameters

Start a session with the `join` function. Pass in a session name, [Video SDK JWT](/docs/video-sdk/auth/), user name, and a session password. To specify the host of the session, pass role `1` into the Video SDK JWT. If multiple users use role `1`, the first to join will be the host and others will be managers. See [user roles and actions](#user-roles-and-actions) for details. To join session users, pass role `0` into the Video SDK JWT.

| Parameter                | Required                    | Parameter Description                                                                                                                                                                                                                                                                                                                                |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `topic`                  | Yes                         | The name of the session you are creating or joining. Should be alphanumeric with a max-length of 150 characters. It can include symbols and the space character. Session names are case insensitive (they are all converted to lowercase). This must match the `tpc` value in the [SDK JWT payload](/docs/video-sdk/auth/#payload).                  |
| `token`                  | Yes                         | JWT token generated from your SDK credentials. See [Authorize](/docs/video-sdk/auth/) for details.                                                                                                                                                                                                                                                   |
| `userName`               | Yes                         | Display name of the user shown in the session. If empty, the name is displayed as the string "null". Max 200 characters. Values longer than 200 characters are truncated without error.                                                                                                                                                              |
| `sessionPassword`        | No, unless set by the host. | Password for session. If set, the session will be private and can only be joined if the user provides a valid password. If not set, the session will be public for anyone in your account and users only need to use the `topic` to join. The field has a max-length limit of 10 characters, printable ASCII characters only (ch >= 32 && ch < 127). |
| `sessionIdleTimeoutMins` | No                          | The number of minutes a session can remain idle (with only one user present and no cloud recording) before it automatically ends. The default is 40 minutes. This setting applies only when the host is the sole user; otherwise, the default timeout applies.                                                                                       |

See [`join`](https://marketplacefront.zoom.us/sdk/custom/web/modules/ZoomVideo.VideoClient.html#join) in the Video SDK reference for details.

---

## Post-session: Leave and end session

To leave a session, call the `client.leave()` function. When the last user leaves, the session will end.

```javascript
client.leave();
```

To end a session, call the `client.leave()` function and pass in `true`. Only the host can end a session with users present.

```javascript
client.leave(true);
```

Add a [notification](#connection-issues-and-host-ended-session) when a host ends a session to inform users why the session ended.

![Show a notification when the session ends](/img/vsdk-web-bp8-sessionended.png)

> **Note:** If the user exits by closing the browser, tab, force-closes the app, or runs out of battery, handle with [`leaveOnPageUnload`](https://marketplacefront.zoom.us/sdk/custom/web/interfaces/ZoomVideo.InitOptions.html#leaveOnPageUnload).

### Clean up the Video SDK

After the session has ended, you should also stop rendering the videos and call [`destroyClient`](https://marketplacefront.zoom.us/sdk/custom/web/modules/ZoomVideo.default.html#destroyClient) to destroy the SDK so it can be used again if needed.

---

## User roles and actions

People in a session can hold one of the following roles: host, manager, or participant.

### Host

The user with the host [`role_type`](/docs/video-sdk/auth/#payload) is the host of the session.

A **host** of the session has the following **privileges**.

-   View information of users in the session.
-   Change the display name of a user in the session.
-   Mute or unmute a user's audio.
-   Transfer the host role to someone else in the session.
-   Promote another user to be a manager of the session.
-   Remove participants from the session.
-   Revoke manager privilege from a user.
-   Start a live stream.
-   Prevent other users from sharing their screen (lock screen).
-   Admit users on hold, and turn OnHold on or off. See [Hold participants until admitted](#hold-participants-until-admitted).
-   End the session.

### Manager

The manager or co-host role can be assigned to a participant by the host to help the host to manage the session participants.

A **manager** of the session is assigned the following subset of the **host privileges**.

-   Remove participants from a session.
-   Change the display name of a user in the session.
-   Mute or unmute a user's audio.
-   Prevent other users from sharing their screen (lock screen).
-   Admit users on hold, and turn OnHold on or off.

### Participant

A regular user who joins the session without host or manager permission. A participant has **privileges** to view their own information as well as the information of other users.

### User list

We recommend listing the users who are connected to the session and a user count so that other users can see who they are in a session with.

We also recommend adding their video, audio, and screen share state next to their names so that you can see their state. This is helpful when a user cannot be heard, but they are actually muted. If you can see their audio status is muted, you can tell them that they need to unmute to be heard.

![Show user list and audio video statuses](/img/uitk-web-UsersComponent2.png)

See the [VideoClient namespace reference documentation](https://marketplacefront.zoom.us/sdk/custom/web/modules/ZoomVideo.VideoClient.html) to learn more about managing host, manager, and user roles.

---

## Hold participants until admitted

OnHold places participants in a holding state (a waiting room) when they join a session. They stay on hold, outside the session, until a host or manager admits them. OnHold requires Video SDK for Web 2.6.10 or later.

The [`hold` JWT payload field](auth.md#hold-participants-until-admitted) controls whether a session supports OnHold. Set it in the JWT of the first user to join, which starts the session.

-   `0` - (default) The session does not support OnHold.
-   `1` - The session supports OnHold, and OnHold is on when the session starts.
-   `2` - The session supports OnHold, but OnHold is off when the session starts. A host or manager can turn it on during the session.

> **Note**
>
> When `hold` is `1` or `2`, the session rejects join attempts from clients that do not support OnHold, including Web clients earlier than 2.6.10 and native clients earlier than 2.6.11. Update every client that joins the session before you turn on OnHold.

### Check OnHold status

Call `isHoldEnabled()` to check whether OnHold is on for the session, and `isUserOnHold()` to check whether the current user is on hold.

```javascript
const isHoldEnabled = client.isHoldEnabled();
const isOnHold = client.isUserOnHold();
```

The Web SDK has no equivalent of the native `isSupportHold()`. `isHoldEnabled()` only tells you whether OnHold is currently on.

### Wait on hold (participant side)

When OnHold is on, `client.join()` still resolves, but the user is placed on hold instead of entering the session. Check `client.isUserOnHold()` after `join` resolves, and listen for `on-hold-change` to show or hide a holding screen.

While the user is on hold, don't start audio, video, or screen share. Methods that require being in the session reject with error type `IMPROPER_MEETING_STATE` and reason `on hold`.

When a host or manager admits the user, the SDK emits `on-hold-change` with `isOnHold: false`, then reconnects the user into the session: `connection-change` fires with `state: "Reconnecting"` and `reason: "on hold"`, followed by `state: "Connected"`. Start audio and video after `Connected`. The `"on hold"` reason is a plain string; it is not a member of the `ReconnectReason` enum.

```javascript
client.on("on-hold-change", (payload) => {
    if (payload.isOnHold) {
        showHoldingScreen();
    } else {
        // Admitted. The SDK now reconnects the user into the session.
        showLoading("Joining the session...");
    }
});

client.on("connection-change", (payload) => {
    if (payload.state === "Reconnecting" && payload.reason === "on hold") {
        showLoading("Joining the session...");
    } else if (payload.state === "Connected" && !client.isUserOnHold()) {
        showSessionScreen();
        // The user is in the session. Start audio, video, and other features here.
    }
});

await client.join("sessionName", "VIDEO_SDK_JWT", "userName", "sessionPasscode");

if (client.isUserOnHold()) {
    showHoldingScreen();
}
```

To leave while on hold, call `client.leave()`.

### Get notified when other users are on hold (host and manager side)

The Web SDK has no dedicated event for users entering or leaving the on-hold list (the native `onHoldUserJoin()` and `onHoldUserLeave()` callbacks). Instead, hosts and managers call `client.getOnHoldUsers()` to get the users currently on hold as an array of `Participant` objects, and refresh that list on `user-added`, `user-updated`, and `user-removed`. `user-updated` also covers the current user gaining or losing the host or manager role.

Only hosts and managers can call `getOnHoldUsers()`. Don't gate the list on `isHoldEnabled()`: turning OnHold off doesn't admit users who are already on hold, so they still need to be shown and admitted.

```javascript
function refreshOnHoldUsers() {
    const canAdmit = client.isHost() || client.isManager();
    const onHoldUsers = canAdmit ? client.getOnHoldUsers() : [];
    // Render onHoldUsers, for example user.userId and user.displayName.
    renderWaitingRoom(onHoldUsers);
}

client.on("user-added", refreshOnHoldUsers);
client.on("user-updated", refreshOnHoldUsers);
client.on("user-removed", refreshOnHoldUsers);
```

The `Participant` interface also has an `isOnHold` property. If you build your participant list from `user-added` payloads, skip entries where `isOnHold` is `true`.

### Admit users on hold

A host or manager can call `admit(userId)` to admit one user, or `admitAll()` to admit every user on hold.

```javascript
try {
    // Admit one user.
    await client.admit(userId);

    // Admit every user on hold.
    await client.admitAll();
} catch (error) {
    console.error(error.type, error.reason);
}
```

-   With many users on hold, `admitAll()` can take a long time to complete.
-   If the current user stops being the host or manager before `admitAll()` completes, the promise resolves early with `"host changed"` or `"co-host changed"`.

### Turn OnHold on or off during a session

A host or manager can call `enableHold()` to turn OnHold on or off. This only works when the `hold` field in the session's JWT is `2`; otherwise the call rejects. The change only affects future join attempts. It doesn't admit users who are already on hold, so call `admit()` or `admitAll()` for them.

```javascript
// Pass true to turn OnHold on, or false to turn it off.
await client.enableHold(true);
```


---

## Add features

Now that you have added sessions to your integration, you can add Video SDK features such as video, audio, screen sharing, chat, and more. See the [VideoClient namespace in the Video SDK Reference](https://marketplacefront.zoom.us/sdk/custom/web/modules/ZoomVideo.VideoClient.html) for details on all available methods and callbacks.
