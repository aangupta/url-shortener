document.querySelector('#shorten').addEventListener('click', () => {
    const url = document.querySelector('#url').value;
    fetch('http://localhost:3000/api/urls/', {
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
            console.log(url);
            document.querySelector('#longurl').value = url;
            document.querySelector('#shorturl').value = json.id;
            document.querySelector('#copy').addEventListener('click', () => {
                const copyText = document.querySelector('#shorturl');
                copyText.select();
                document.execCommand('copy');
                alert(`Copied the text: ${copyText.value}`);
            });
        });
});

function printurl() {
    fetch('http://localhost:3000/api/urls/').then((response) => response.json()).then()
    );
}
