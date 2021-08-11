document.addEventListener('DOMContentLoaded', function () {

    // Navbar actions
    document.querySelector('#nav-1').addEventListener('click', () => {
        document.querySelector('#amenities-section').scrollIntoView({block: 'start', behavior: 'smooth'});
        document.querySelector('#navbarMenuHeroB').classList.toggle('is-active');
        document.querySelector('.navbar-burger').classList.toggle('is-active');
    })
    document.querySelector('#nav-2').addEventListener('click', () => {
        document.querySelector('#rates-section').scrollIntoView({block: 'start', behavior: 'smooth'});
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

    // Contact form Email
    document.querySelector('#submit').addEventListener('click', () => submitContactForm());

    // Render Gallery
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
            row.className = "row columns is-multiline is-mobile";

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

        var gallerytitle = document.createElement("h1");
        gallerytitle.innerHTML = "Gallery";
        gallerytitle.id = "gallery-title";
        gallerytitle.className = "title is-1";

        herobody.append(gallerytitle, container);
        document.querySelector('#gallery').append(herobody);
    });
}

function submitContactForm() {

    // Get field data
    var formName = document.querySelector('#name-field').value;
    var formEmail = document.querySelector('#email-field').value;
    var formMessage = document.querySelector('#message-field').value;

    // Check for required fields
    if (formName.length > 0 && formEmail.length > 0 && formMessage.length > 0) {
        // Post data to Logic App
        console.log(formName, formEmail, formMessage);
        fetch('https://prod-90.eastus.logic.azure.com:443/workflows/19628035679f4de4a33c255d146c3325/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hoJmYypJVC_4VS57Kh5EIkQciNsigXo2cdtPUp7IIoc', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                name: formName,
                email: formEmail,
                message: formMessage
            })
        })
        // Print result
        //.then(response => response.json())
        .then(result => {
            console.log(result);
            
            // Hide contact form and show confirmation message
            document.querySelector('#contact').style.display = 'none';
            document.querySelector('#confirmation').style.display = 'block';
        });
 
    } else {
        console.log('Form incomplete.')
    }

}