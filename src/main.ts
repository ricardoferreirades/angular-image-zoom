import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ImageZoomDirective } from './directives/image-zoom.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
  <div class="image-container">
    
    <img src="https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg" 
    data-image-zoom="https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg"  imageZoom >

    <img src="https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp" 
    data-image-zoom="https://cdn.motor1.com/images/mgl/MkO9NN/s1/future-supercars.webp"  imageZoom >

    <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960" 
    data-image-zoom="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960"  imageZoom >

    <img src="https://reyer-group.com/wp-content/uploads/2021/05/reyer_mustang_yellow_1920x1280.jpg" 
    data-image-zoom="https://reyer-group.com/wp-content/uploads/2021/05/reyer_mustang_yellow_1920x1280.jpg"  imageZoom >

    <img src="https://hips.hearstapps.com/hmg-prod/images/2022-chevrolet-corvette-z06-1607016574.jpg" 
    data-image-zoom="https://hips.hearstapps.com/hmg-prod/images/2022-chevrolet-corvette-z06-1607016574.jpg"  imageZoom >

    <img src="https://s1.cdn.autoevolution.com/images/news/amid-production-delays-chevrolet-offers-new-videos-to-disgruntled-corvette-z06-customers-197448_1.jpg" 
    data-image-zoom="https://s1.cdn.autoevolution.com/images/news/amid-production-delays-chevrolet-offers-new-videos-to-disgruntled-corvette-z06-customers-197448_1.jpg"  imageZoom >

    <img src="https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_1920%2Cc_limit/9.%2520DeLorean-Alpha-5%2520%255BDeLorean%255D.jpg" 
    data-image-zoom="https://media.architecturaldigest.com/photos/63079fc7b4858efb76814bd2/16:9/w_1920%2Cc_limit/9.%2520DeLorean-Alpha-5%2520%255BDeLorean%255D.jpg"  imageZoom >

    <img src="https://i.ytimg.com/vi/SEViyU7SAM4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAI-FunQxlLD4KJKO4UkV5mZeNmKg" 
    data-image-zoom="https://i.ytimg.com/vi/SEViyU7SAM4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAI-FunQxlLD4KJKO4UkV5mZeNmKg"  imageZoom >

    <img src="https://images.topgear.com.ph/topgear/images/2024/07/26/1-1721978818.jpg" 
    data-image-zoom="https://images.topgear.com.ph/topgear/images/2024/07/26/1-1721978818.jpg"  imageZoom >

    <img src="https://www.corvetteblogger.com/images/content/2023/072523_11b.jpg" 
    data-image-zoom="https://www.corvetteblogger.com/images/content/2023/072523_11b.jpg"  imageZoom >

    <img src="https://news.mgmotor.eu/wp-content/uploads/2021/04/MG-Cyberster-Concept-1600x900.jpg" 
    data-image-zoom="https://news.mgmotor.eu/wp-content/uploads/2021/04/MG-Cyberster-Concept-1600x900.jpg"  imageZoom >
</div> 
  `,
  imports: [ImageZoomDirective],
  styles: [
    `
  .image-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  img {
    max-width: 200px
  }

  `,
  ],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
