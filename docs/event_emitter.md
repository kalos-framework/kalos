# Event Emitter

You might want to use event emitter when you want to:

- subscribe to framework event.
- provide events and publish to other parts of the web application.

**There is only one instance of EventEmitter, which can be accessed globally throughout the web app.**

## Usage

Acquire the global emitter.

```js
const emitter = Kalos.emitter;
```

To subscribe for an event:

```js
emitter.on('EVENT_NAME', (args) => {
    // your event handler
});
```

To publish an event:

```js
emitter.emit('EVENT_NAME', ARG_1, ARG_2...);
```

To unsubscribe from an event:
```js
emitter.off('EVENT_NAME', HANDLER_TO_UNSUBSCRIBE);
```

