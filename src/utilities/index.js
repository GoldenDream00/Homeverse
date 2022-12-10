import { toast } from 'react-toastify';
import { getAuth, signInAnonymously } from 'firebase/auth';

export const signInToGetToken = async () => {
    const auth = getAuth();
    return await signInAnonymously(auth);
}

export const getUserToken = async () => {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken(true);
    return token;
}

export const UpperCase = (str) => {
    if (typeof str === "string") {
        return str.toUpperCase();
    }
    console.error("Uppercase", "This is not String");
}


export const LowerCase = (str) => {
    if (typeof str === "string") {
        return str.toLowerCase();
    }
    console.error("Uppercase", "This is not String");
}

export const notifySuccess = (str) => {
    if (typeof str === "string") {
        return toast.success(str, {
            theme: "dark"
        });
    }
    console.error("Notify", "This is not String");
}
export const notifyError = (str) => {
    if (typeof str === "string") {
        return toast.error(str, {
            theme: "dark"
        });
    }
    console.error("Notify", "This is not String");
}

export const start_and_end = (str) => {
    if (typeof str === "string") {
        return str.substr(0, 5) + '...' + str.substr(str.length - 5, str.length);
    }
    console.error("Wallet Address", "This is not String");

}

export const Capitalize = (str) => {
    if (typeof str === "string") {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    console.error("Capitalize", "This is not String");
}

export const getCurrentSeconds = () => {
    return new Date().getTime() / 1000;
}

export const parseBigNumber = (number) => {
    return number / 1000000000000000000;
}

export const getCroppedImg = (image, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // // As Base64 string
    const base64Image = canvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve, reject) => {
        canvas.toBlob(file => {
            file.name = fileName;
            resolve(file);
        }, 'image/jpeg');
    });
}

export const removeScrollBar = () => {
    document.body.style.overflow = 'hidden';
}

export const showScrollBar = () => {
    document.body.style.overflow = 'visible';
}

export const getVideoImage = (file) => {
    let previewTime = 0;

    console.log("getting video cover for file: ", file);
    return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            reject("error when loading video file", ex);
        });

        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            previewTime = videoPlayer.duration / 2;
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
                videoPlayer.currentTime = previewTime;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                console.log('video is now paused at %ss.', previewTime);
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement("canvas");

                canvas.width = "450";
                canvas.height = "450";
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                ctx.canvas.toBlob(
                    blob => {
                        resolve(blob);
                    },
                    "image/jpeg",
                    0.75 /* quality */
                );
            });
        });
    });
}

export const getCurrentDateTime = () => {
    var currentdate = new Date();
    var datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    return datetime;
}

export const checkAssetLoading = (src) => {
    return new Promise((resolve, reject) => {
        const bg = new Image();
        bg.onload = function () {
            resolve(true);
        }
        bg.src = src;
    })
}

export const generateKeywords = (str) => {
    const wordArr = str.toLowerCase().split(' ');
    const searchableKeywords = [];
    let prevKey = '';
    for (const word of wordArr) {
        const charArr = word.toLowerCase().split('');
        for (const char of charArr) {
            const keyword = prevKey + char;
            searchableKeywords.push(keyword);
            prevKey = keyword;
        }
        prevKey = '';
    }
    return searchableKeywords;
};


export const truncateTwoDecimal = (theform) => {
    var num = theform
    var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]
    return with2Decimals;
}