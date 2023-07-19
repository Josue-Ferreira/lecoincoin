export async function fetchGet(url) {
    const responseDB = await fetch(url);
    const dataJson = await responseDB.json();
    return dataJson;
}

export async function fetchPOST(url, bodyObject) {
    const responseDB = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(bodyObject)
    });
    const dataJson = await responseDB.json();
    return dataJson;
}

export async function fetchPUT(url, bodyObject) {
    const responseDB = await fetch(url, {
        method: 'PUT',
        headers:{
            'Content-type' : 'application/json'
        },
        body: JSON.stringify(bodyObject)
    });
    const dataJson = await responseDB.json();
    return dataJson;
}

export async function fetchDelete(url) {
    const responseDB = await fetch(url,{
        method: 'DELETE'
    });
    return responseDB;
}

export async function postImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_PRESET);
    const responseCloud = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`,{
        method: 'POST',
        body: formData
    });
    if(responseCloud.ok){
        const responseCloudJSON = await responseCloud.json();
        return responseCloudJSON.public_id;
    }else{
        throw new Error('Cloudinary: An error has occured: '+responseCloud.status);
    }
}