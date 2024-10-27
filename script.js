const accessKey = "XuGwdYSxlBmNih4Beanm6JjODKdVzUw8cPQaTfPa91s";

function fetchImages(method) {
    const query = document.getElementById("searchQuery").value.trim();
    const errorMessage = document.getElementById("errorMessage");

    if (!query) {
        
        errorMessage.classList.remove("hidden");
        return;
    } else {
       
        errorMessage.classList.add("hidden");
    }

    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    if (method === "xhr") {
        fetchImagesXHR(url);
    } else if (method === "promises") {
        fetchImagesWithPromises(url);
    } else {
        fetchImagesWithAsync(url);
    }
}

function fetchImagesXHR(url) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            displayImages(data.results);
        }
    };
    xhr.send();
}

function fetchImagesWithPromises(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => displayImages(data.results))
        .catch(error => console.error("Error fetching images:", error));
}

async function fetchImagesWithAsync(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

function displayImages(images) {
    const imageGrid = document.getElementById("imageGrid");
    imageGrid.innerHTML = ""; 
    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || "Unsplash Image";
        imageGrid.appendChild(imgElement);
    });
}
