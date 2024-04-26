import { useState, useEffect } from 'react';

/**
 * Trying out this custom hook I joinked from he documentation website.
 * This hook should notify the system when a user has lost connection to the internets.
 * @return {boolean}
 */
export function useOnlineStatus() {
    //State to determine if the use currently haves internet access
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true);
        }
        function handleOffline() {
            setIsOnline(false);
        }

        //This uses the eventlistner to check if the user haves a active internet connection.
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);
    return isOnline;
}

/*
Event listener types (not all of them) that can be used to detect user behavior:

UI Events:
load: Fired when the window has finished loading
unload: Fires just before the document is about to be unloaded
resize: Fired when the document view has been resized
scroll: The document view or an element has been scrolled

Keyboard Events:
keydown: A key is pressed down
keyup: A key is released
keypress: A character key is pressed

Mouse Events:
click: A pointing device button has been pressed and released on an element
dblclick: A pointing device button is clicked twice on an element
mousedown: A pointing device button is pressed on an element
mouseup: A pointing device button is released over an element
mousemove: A pointing device is moved over an element
mouseover: A pointing device is moved onto an element
mouseout: A pointing device is moved off an element
wheel: A wheel button of a pointing device is rotated in any direction

Form Events:
submit: A form is submitted
reset: The reset button is clicked
change: The user blurs the form field after changing the value
focus: The form field gets focus
blur: The form field losts focus

Touch Events:
touchstart: A touch point is placed on the touch surface.
touchend: A touch point is removed from the touch surface.
touchmove: A touch point is moved along the touch surface.

Drag & Drop Events:
drag: An element or text selection is being dragged
dragend: A drag operation is being ended
dragenter: A dragged element or text selection enters a valid drop target
dragstart: The user starts dragging an element or text selection

Progress Events:
progress: An event to indicate that an operation is in progress


 */