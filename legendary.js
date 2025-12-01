const reel = document.querySelector('.reel');

const penguins = [
    'Bouquet.png',
    'Black_Penguin.png',
    'Blue_Penguin.png',
    'Brown_Penguin.png',
    'Green_Penguin.png',
    'Orange_Penguin.png',
    'Pink_Penguin.png',
    'Purple_Penguin.png',
    'Red_Penguin.png',
    'Sky_Blue_Penguin.png',
    'Bouquet.png',
    'Sticker.png',
    'Black_Penguin.png',
    'Blue_Penguin.png',
    'Brown_Penguin.png',
    'Green_Penguin.png',
    'Orange_Penguin.png',
    'Pink_Penguin.png',
    'Purple_Penguin.png',
    'Red_Penguin.png',
    'Sky_Blue_Penguin.png',
    'Sticker.png'
];

const imagePromises = penguins.map(src => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = `images/${src}`;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
});

Promise.all(imagePromises).then(images => {
    // Duplicate the images to create a seamless loop
    const fullReel = [...images, ...images];
    fullReel.forEach(img => {
        reel.appendChild(img);
    });
});