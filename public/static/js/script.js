document.querySelector('#shorten').addEventListener('click', () => {
    const url = document.querySelector('#url').value;
    /* console.log(url); */
    if (url === '') alert('Enter the URL');
    else {
        fetch('./api/urls/', {
            method: 'POST',
            body: JSON.stringify({
                longUrl: url,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                /* console.log(url); */
                document.querySelector('#longurl').value = url;
                document.querySelector('#shorturl').value = `${document.location.origin}/u/${json.id}`;
                document.querySelector('#copy').addEventListener('click', () => {
                    const copyText = document.querySelector('#shorturl');
                    copyText.select();
                    document.execCommand('copy');
                    alert(`Copied the text: ${copyText.value}`);
                });
            });
    }
});

function printurl() {
    fetch('./api/urls/')
        .then((response) => response.json())
        .then((urls) => {
            urls.forEach((element) => {
                const shortcontent = document.createTextNode(element.id);
                const longcontent = document.createTextNode(element.longUrl);
                const br = document.createElement('br');
                const shorturl = document.querySelector('#shorturlprint');
                const longurl = document.querySelector('#longurlprint');
                longurl.appendChild(longcontent);
                longurl.appendChild(br.cloneNode(true));
                shorturl.appendChild(shortcontent);
                shorturl.appendChild(br.cloneNode(true));
                console.log(element.id);
                console.log(element.longUrl);
            });
        });
}

document.querySelector('#search').addEventListener('click', () => {
    const url = new URL('/api/urls/', 'https://curtly.herokuapp.com/');
    const searchurl = document.querySelector('#searchurl');
    const param = { id: searchurl.value };
    Object.keys(param).forEach((key) => {
        url.searchParams.append(key, param[key]);
    });
    url.search = new URLSearchParams(param).toString();
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            json.forEach((element) => {
                const shortcontent = element.id;
                const longcontent = element.longUrl;
                if (shortcontent === searchurl.value) {
                    document.querySelector('#searchresult').value = longcontent;
                }
            });
        });
});
