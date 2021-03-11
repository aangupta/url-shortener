function changeButtonText() {
    setTimeout(() => {
        document.querySelector('#copy').value = 'Copy';
    }, 3000);
}

document.querySelector('#shorten').addEventListener('click', () => {
    const url = document.querySelector('#url').value;
    if (!url) {
        window.alert('Enter the log URL');
    } else {
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
                document.querySelector('#shorturl').value = `${document.location.origin}/u/${json.id}`;
                document.querySelector('#copy').addEventListener('click', () => {
                    const copyText = document.querySelector('#shorturl');
                    copyText.select();
                    document.execCommand('copy');
                    document.querySelector('#copy').value = 'Copied';
                    changeButtonText();
                });
            });
    }
});

function printurl() {
    fetch('./api/urls/')
        .then((response) => response.json())
        .then((urls) => {
            urls.forEach((element) => {
                const shortid = `${document.location.origin}/u/${element.id}`;
                const shortcontent = document.createTextNode(shortid);
                const longcontent = document.createTextNode(element.longUrl);
                const br = document.createElement('br');
                /* const shorturl = document.querySelector('#shorturlprint');
                const longurl = document.querySelector('#longurlprint'); */
                const result = document.querySelector('#result');
                const text1 = document.createTextNode('Long URL: ');
                const text2 = document.createTextNode('Short URL: ');
                result.appendChild(text1);
                result.appendChild(br.cloneNode(true));
                result.appendChild(longcontent);
                result.appendChild(br.cloneNode(true));
                result.appendChild(text2);
                result.appendChild(br.cloneNode(true));
                result.appendChild(shortcontent);
                result.appendChild(br.cloneNode(true));
                result.appendChild(br.cloneNode(true));
                result.appendChild(br.cloneNode(true));

                /* console.log(element.id);
                console.log(element.longUrl); */
            });
        });
}


/* document.querySelector('#search').addEventListener('click', () => {
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
}); */
