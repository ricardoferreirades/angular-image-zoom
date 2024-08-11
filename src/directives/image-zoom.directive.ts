import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

const DEFAULT_ZOOM = 1.5;

@Directive({
  selector: '[imageZoom]',
  standalone: true,
})
export class ImageZoomDirective implements OnInit {
  @Input() zoom: number;
  @Input() maxWidth: number;
  @Input() alignTo: 'left' | 'right' = 'right';
  @Input() minidth: number;
  @Input() containerMargin = 8;

  private imageContainer: HTMLDivElement | null = null;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit(): void {
    this.imageContainer = document.querySelector(
      '[data-id="image-zoom-container"]'
    );
    if (!this.imageContainer) {
      // use the before and after instead
      this.imageContainer = document.createElement('div');
      this.imageContainer.setAttribute('data-id', 'image-zoom-container');
      this.imageContainer.style.position = 'fixed';
      this.imageContainer.style.top = '0px';
      this.imageContainer.style.left = '0px';
      this.imageContainer.style.zIndex = '1000';
      this.imageContainer.style.width = '0px';
      this.imageContainer.style.height = '0px';
      this.imageContainer.style.backgroundColor = 'red';
      this.imageContainer.style.opacity = '1';
      this.imageContainer.style.transitionProperty = 'opacity, top';
      this.imageContainer.style.transitionDuration = '0.3s';
      this.imageContainer.style.transitionTimingFunction = 'ease';

      document.body.appendChild(this.imageContainer);
    }
  }

  // Maybe the hover must be in the whole document instead
  @HostListener('mouseenter', ['$event.target'])
  onMousehover(img: HTMLImageElement) {
    console.log('mouse entered');

    const { scrollY } = window;

    const imageWidth = this.elementRef.nativeElement.naturalWidth;
    const imageheight = this.elementRef.nativeElement.naturalHeight;
    const imageRenderedWidth = this.elementRef.nativeElement.width;
    const imageRenderedheight = this.elementRef.nativeElement.height;
    const imageXAxis = this.elementRef.nativeElement.offsetLeft;
    const imageYAxis = this.elementRef.nativeElement.offsetTop - scrollY;
    const imageSrc = this.elementRef.nativeElement.src;
    const imageToShow = this.elementRef.nativeElement.dataset.imageZoom;

    let zoomedWidth: number;
    let zoomedHeight: number;

    let image: HTMLImageElement = null as any;

    if (imageToShow) {
      image = new Image();
      image.src = imageToShow;
      zoomedWidth = image.naturalWidth;
      zoomedHeight = image.naturalHeight;
    } else {
      zoomedWidth = imageRenderedWidth * (this.zoom || DEFAULT_ZOOM);
      zoomedHeight = imageRenderedheight * (this.zoom || DEFAULT_ZOOM);
    }

    console.log('measurements', { scrollY });

    console.log({
      imageToShow,
      image,
      imageWidth,
      imageheight,

      imageRenderedWidth,
      imageRenderedheight,

      zoomedWidth,
      zoomedHeight,

      imageXAxis,
      imageYAxis,

      imageSrc,
    });

    // image conatiner exists
    if (this.imageContainer) {
      let imageLeft = 0;

      const container = document.body;
      const containerWidth = container.offsetWidth;
      const containerComputedStyle = window.getComputedStyle(container);
      const containerMargins =
        parseInt(containerComputedStyle.marginLeft, 10) +
        parseInt(containerComputedStyle.marginRight, 10);

      // page center based in body width and margins. Padding is not considered
      const PAGE_CENTER = Math.round((containerWidth + containerMargins) / 2);

      const imageAlignment = imageXAxis + imageRenderedWidth / 2;

      if (
        imageAlignment < PAGE_CENTER &&
        this.minidth &&
        this.minidth <= imageXAxis
      ) {
        console.log('image is on the left side');
      } else if (imageAlignment > PAGE_CENTER)
        console.log('image is on the right side');
      else console.log('image is in the center');

      if (this.alignTo === 'right') {
        // horizontal position
        if (imageXAxis < zoomedWidth) {
          imageLeft = imageRenderedWidth + imageXAxis + this.containerMargin;
          this.imageContainer.style.left = imageLeft + 'px';
        }

        // image width
        if (imageLeft + zoomedWidth > document.body.clientWidth) {
          const difference = Math.abs(
            imageLeft -
              this.containerMargin +
              zoomedWidth -
              document.body.clientWidth
          );

          const percent = (zoomedWidth - difference) / zoomedWidth;

          zoomedWidth = zoomedWidth * percent;
          zoomedHeight = zoomedHeight * percent;

          this.imageContainer.style.width = `${zoomedWidth}px`;
          this.imageContainer.style.height = `${zoomedHeight}px`;
        } else {
          // container size
          this.imageContainer.style.width = `${zoomedWidth}px`;
          this.imageContainer.style.height = `${zoomedHeight}px`;
        }
      } else if (this.alignTo === 'left') {
        // horizontal position
        imageLeft = this.containerMargin;
        this.imageContainer.style.left = imageLeft + 'px';

        // render image from the beginnig to the image
        if (zoomedWidth > imageXAxis) {
          const difference = Math.abs(imageXAxis - imageLeft * 2 - zoomedWidth);

          const percent = (zoomedWidth - difference) / zoomedWidth;

          zoomedWidth = zoomedWidth * percent;
          zoomedHeight = zoomedHeight * percent;

          this.imageContainer.style.width = `${zoomedWidth}px`;
          this.imageContainer.style.height = `${zoomedHeight}px`;
        } else {
          // container size
          this.imageContainer.style.width = `${zoomedWidth}px`;
          this.imageContainer.style.height = `${zoomedHeight}px`;
        }
      }

      // background size depends whether the container has flexible width or height
      this.imageContainer.style.backgroundSize = `contain`;
      this.imageContainer.style.backgroundRepeat = `no-repeat`;
      // cntainer background
      this.imageContainer.style.backgroundImage = `url(${
        imageToShow || imageSrc
      })`;

      const max = Math.max(imageRenderedheight, zoomedHeight);
      const min = Math.min(imageRenderedheight, zoomedHeight);
      const difference = (max - min) / 2;

      console.log({
        max,
        min,
        difference,
        imageLeft,
        imageAlignment,
        PAGE_CENTER,
      });

      // vertival position
      // Align to the top
      const differenceToMargin = imageYAxis - difference;
      if (differenceToMargin < this.containerMargin) {
        this.imageContainer.style.top = this.containerMargin + 'px';
        // Align to the bottom
      } else if (
        imageYAxis + zoomedHeight - difference >
        window.innerHeight - this.containerMargin
      ) {
        this.imageContainer.style.top =
          window.innerHeight - zoomedHeight - this.containerMargin + 'px';
      } else {
        // Align to the center
        this.imageContainer.style.top = imageYAxis - difference + 'px';
      }

      this.imageContainer.style.opacity = '1';
    }
  }

  @HostListener('mouseleave', ['$event.target'])
  onMouseleave(img: HTMLImageElement) {
    console.log('Mouse leaved');
    if (this.imageContainer) {
      this.imageContainer.style.transitionDuration = '0';
      this.imageContainer.style.opacity = '0';

      // it sets the image size to zero in order to avoid buggy behavior with hover and mouse selection
      this.imageContainer.style.width = `0px`;
      this.imageContainer.style.width = `0px`;
    }
  }
}
