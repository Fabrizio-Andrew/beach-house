document.addEventListener('DOMContentLoaded', function () {
    // Navbar actions
    document.querySelector('#nav-1').addEventListener('click', () => {
        document.querySelector('#parallax-3').scrollIntoView({block: 'start', behavior: 'smooth'});
        document.querySelector('#navbarMenuHeroB').classList.toggle('is-active');
        document.querySelector('.navbar-burger').classList.toggle('is-active');
    })
    document.querySelector('#nav-2').addEventListener('click', () => {
        document.querySelector('#parallax-3').scrollIntoView({block: 'start', behavior: 'smooth'});
        document.querySelector('#navbarMenuHeroB').classList.toggle('is-active');
        document.querySelector('.navbar-burger').classList.toggle('is-active');
    })
    document.querySelector('#nav-3').addEventListener('click', () => {
        document.querySelector('#gallery').scrollIntoView({block: 'start', behavior: 'smooth'});
        document.querySelector('#navbarMenuHeroB').classList.toggle('is-active');
        document.querySelector('.navbar-burger').classList.toggle('is-active');
    })
    document.querySelector('#nav-4').addEventListener('click', () => {
        document.querySelector('.cta').scrollIntoView({block: 'start', behavior: 'smooth'});
        document.querySelector('#navbarMenuHeroB').classList.toggle('is-active');
        document.querySelector('.navbar-burger').classList.toggle('is-active');
    })

    // Amenities tabs
    document.querySelector('#link-1').addEventListener('click', () => showPane1());
    document.querySelector('#link-2').addEventListener('click', () => showPane2());

    renderGallery();
});

function showPane1() {
    document.querySelector('#tab-2').className = '';
    document.querySelector('#tab-1').className = 'is-active';
    document.querySelector('#pane-2').style.display = 'none';
    document.querySelector('#pane-1').style.display = 'block';
}

function showPane2() {
    document.querySelector('#tab-1').className = '';
    document.querySelector('#tab-2').className = 'is-active';
    document.querySelector('#pane-1').style.display = 'none';
    document.querySelector('#pane-2').style.display = 'block';
}

function renderGallery() {

    // Function settings
    var galleryurl = 'https://beachhouse.blob.core.windows.net/gallery?restype=container&comp=list'
    var rowlength = 4
    var columnname = 'column is-3'

    // Fetch all files in blob
    fetch(galleryurl)
    .then(response => response.text())
    .then( str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(xml => {
        let bloblist = Array.from(xml.getElementsByTagName("Url"));
        console.log(bloblist);

        // Create elements to hold gallery
        var herobody = document.createElement('div');
        herobody.className = 'hero-body';
    
        var container = document.createElement('div');
        container.className = 'container';

        // Split blobs into rows defined by the rowlength variable
        var rows = [];
        while (bloblist.length > 0)
            rows.push(bloblist.splice(0, rowlength));
        console.log(rows);
        
        rows.forEach(async rowarray => {
            let row = document.createElement('div');
            row.className = "row columns is-multiline";

            rowarray.forEach(async bloburl => {
                var col = document.createElement('div');
                col.className = columnname;

                var card = document.createElement('div');
                card.className = 'card large';

                var cardimage = document.createElement('div');
                cardimage.className = 'card-image';

                var figure = document.createElement('figure');
                figure.className = 'image is-5by4';

                var img = document.createElement('img');
                img.src = bloburl.textContent;
                //TO-DO: alt text

                // Assemble the card
                figure.append(img);
                cardimage.append(figure);
                card.append(cardimage);
                col.append(card);
                row.append(col);
            });

            container.append(row);
        });

        herobody.append(container);

        var gallerytitle = document.createElement("h1");
        gallerytitle.innerHTML = "Gallery";
        gallerytitle.id = "gallery-title";
        gallerytitle.className = "title is-1";

        document.querySelector('#gallery').append(gallerytitle, herobody);
    });
}