let imageUrls = [];
let currentImageIndex = 0;
let intervalId;

function startPresentation() {
    const keyword = document.getElementById('keywordInput').value.trim();
    
    if (!keyword) {
      alert('Please enter a keyword!');
      return;
    }
  
    // Show the loading message AFTER checking keyword
    const loadingMessage = document.getElementById('loadingMessage');
    const imageElement = document.getElementById('displayedImage');
  
    loadingMessage.hidden = false;
    imageElement.hidden = true;
  
    // Now fetch images
    fetchImages(keyword);
  }
  

  async function fetchImages(keyword) {
    const accessKey = 'F3ewnlkDDm40QC4qG2bmeH5G6OiN7WyedqSP2xTFlII'; 
  
    try {
      const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(keyword)}&per_page=5&client_id=${accessKey}`);
      const data = await response.json();
      console.log(data);
  
      if (data.results.length === 0) {
        document.getElementById('loadingMessage').hidden = true;
        alert('No images found for this keyword. Try another one.');
        return;
      }
  
      imageUrls = data.results.map(result => result.urls.regular);
      currentImageIndex = 0;
  
      showImage();
  
    } catch (error) {
      console.error('Error fetching images:', error);
      document.getElementById('loadingMessage').hidden = true;
      alert('Something went wrong. Please try again.');
    }
  }
  
  
  

  function showImage() {
    const img = document.getElementById('displayedImage');
    const loadingMessage = document.getElementById('loadingMessage');
  
    img.src = imageUrls[currentImageIndex];
    img.hidden = false;
    loadingMessage.hidden = true; 
  

    let timeLeft = 30;
    document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
  
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = `Time left: ${timeLeft}s`;
      
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        currentImageIndex++;
        
        if (currentImageIndex < imageUrls.length) {
          showImage();
        } else {
          endPresentation();
        }
      }
    }, 1000);
  }
  

  function endPresentation() {
    clearInterval(intervalId); 
  
    const img = document.getElementById('displayedImage');
    const timer = document.getElementById('timer');
    const loadingMessage = document.getElementById('loadingMessage');
  
    img.hidden = true;
    timer.textContent = '';
    loadingMessage.hidden = true;
  
    alert('Presentation ended.');
}