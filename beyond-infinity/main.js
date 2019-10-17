

const url = "https://images-api.nasa.gov/search?q=stars&media_type=image";

const request = new XMLHttpRequest();
request.open('GET', url, true);

request.onload = function () {
    const data = JSON.parse(this.response);
    for(let i = 0; i < data.collection.items.length - 50; i++){
        const request_image = new XMLHttpRequest();
        request_image.open('GET', data.collection.items[i].href, true); //retrieves inner json

        request_image.onload = function() {
            const image_href = JSON.parse(this.response);
            const card = document.createElement('div');
            card.setAttribute('class', 'card');
            card.style.backgroundImage = "url(" + image_href[0] + ")";
            card.style.backgroundSize = "cover";

            const body = document.createElement('div');
            body.setAttribute('class', 'card-body');

            const heading = document.createElement('h6');
            heading.setAttribute('class', 'card-title');
            heading.textContent = data.collection.items[i].data[0].title;
            body.appendChild(heading);

            const text = document.createElement('P');
            text.setAttribute('class', 'card-text');
            text.textContent = data.collection.items[i].data[0].description.split(".")[1];
            body.appendChild(text);

            card.appendChild(body);
            document.getElementById('inner').appendChild(card);
        }
        request_image.send();
    }
}

request.send();


