import React, {useEffect, useState} from 'react';
import {Image as ImageIcon} from '@mui/icons-material'
import {Box} from "@mui/material";

/*
At first this was written as a custom React component by extending React.Component, because of some issues I was looking
into fixing the issue at hand but found the notice in React doc:
"Pitfall, We recommend defining components as functions instead of classes."

For this reason I changed this from a custom react class component to a functional component.

 */
function ImageComponent({imgState}) {
    //Using react state hooks which will influence the logic for this function component.
    const [imgSrc, setImgSrc] = useState(`/img/${imgState.image_id}.jpg`);
    const [errored, setErrored] = useState(false);

    //Everytime the image_id changes this will trigger.
    useEffect(() => {
        setImgSrc(`/img/${imgState.image_id}.jpg`);
        setErrored(false);
    }, [imgState.image_id]);

    //When called will set the error state to true which will trigger the conditional statement in the return.
    function handleError() {
        setErrored(true);
    }

    //Returns the image or a ImageIcon as placeholder.
    return (
        <div>
            {errored ?
                <ImageIcon style={{width: '100%', height: 450}}/> :
                <Box
                    component="img"
                    onError={handleError}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        maxWidth: "100%",
                        maxHeight: 450,
                        height: "auto",
                        width: "auto",
                        objectFit: "contain",
                        m: "auto"
                    }}
                    src={imgSrc}
                />}
        </div>
    );
}

export default ImageComponent;