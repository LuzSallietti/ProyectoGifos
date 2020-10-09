const trending_topics_url = `https://api.giphy.com/v1/trending/searches?api_key=ZKclmP8V3fhuu7RAjeaGJ7XdNzu28bef`;
let giphy_trends = document.getElementById("giphy-trends");
let giphy_response; 

document.onload = getTrendingTopics();

async function getTrendingTopics(){
    let response = await fetch(trending_topics_url);
    let JSON_response = await response.json();
    let data = JSON_response.data;
    return data;
}
getTrendingTopics()
.then(response => {
    giphy_response = response;
    showGiphyTrends(giphy_response);
})
.catch(error => console.log (error));

function showGiphyTrends(array){
    giphy_trends.innerText = `${array[0]}, ${array[1]}, ${array[2]}, ${array[3]}, ${array[4]}`;
}
