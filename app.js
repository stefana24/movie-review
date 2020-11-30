// let name_of_film = 'marriage_story';
// const url_api = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${name_of_film}&api-key=F2BahuBN9B94PWiLZqxKu8sTGThVPyi8`;

const form = document.querySelector('form');
let movieTitle = document.getElementById('movie-title');
const container = document.querySelector('.container');

form.addEventListener('submit',function(event){
    event.preventDefault();
    console.log(movieTitle.value);
    const url_api = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${movieTitle.value}&api-key=F2BahuBN9B94PWiLZqxKu8sTGThVPyi8`;
    fetch(url_api )
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        if(data.num_results>0){
            let dataArr = data.results;
            dataArr.forEach(function(result){
                const div_elem = document.createElement('div');
                div_elem.classList = 'single-movie-info';
                const title = document.createElement('p');
                const title_text = document.createTextNode('Title: '+ result.display_title);
                title.appendChild(title_text);
                div_elem.appendChild(title);
    
                const rating = document.createElement('p');
                let substituteR;
                if(result.mpaa_rating === ''){
                    substituteR = '-';
                }else{
                    substituteR =  result.mpaa_rating;
                }
                const rating_text = document.createTextNode('Rating: '+ substituteR);
                rating.appendChild(rating_text);
                div_elem.appendChild(rating);
    
                const headline = document.createElement('p');
                const headline_text = document.createTextNode('Headline: '+ result.headline);
                headline.appendChild(headline_text);
                div_elem.appendChild(headline);
    
                const summary = document.createElement('p');
                const summary_text = document.createTextNode('Summary: '+ result.summary_short);
                summary.appendChild(summary_text);
                div_elem.appendChild(summary);
    
                const publication = document.createElement('p');
                const publication_arr = (result.publication_date).split('-');
                const year = publication_arr[0];
                const month = publication_arr[1];
                const day = publication_arr[2];
                const costumizedPublication = day+"."+month+'.'+year;
                const publication_text = document.createTextNode('Publication Date: '+ costumizedPublication);
                publication.appendChild(publication_text);
                div_elem.appendChild(publication);
        
                container.appendChild(div_elem);
                
            });
        }else{
            const p = document.createElement('p');
            p.classList = 'not-found';
            const p_text = document.createTextNode('No such film was found!');
            p.appendChild(p_text);
            container.appendChild(p);

        }

    })
})



