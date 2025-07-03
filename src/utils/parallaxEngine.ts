interface ParallaxProperty {
  scalar?: number;
  from?: number;
  to?: number;
}

interface ParallaxConfig {
  selector: string;
  properties: {
    translateY?: ParallaxProperty;
    translateX?: ParallaxProperty;
    rotate?: ParallaxProperty;
    scale?: ParallaxProperty;
    opacity?: ParallaxProperty;
    blur?: ParallaxProperty;
  };
  triggerOffset: number;
  duration: string;
}

class ParallaxEngine {
  private config: ParallaxConfig[] = [];
  private elements: Map<string, NodeListOf<Element>> = new Map();
  private isInitialized = false;

  constructor() {
    this.handleScroll = this.handleScroll.bind(this);
  }

  async loadConfig(configPath: string = '/src/data/parallaxConfig.json') {
    try {
      const response = await fetch(configPath);
      this.config = await response.json();
      this.init();
    } catch (error) {
      console.warn('Failed to load parallax config, using default settings');
      this.useDefaultConfig();
    }
  }

  private useDefaultConfig() {
    this.config = [
      {
        selector: '.parallax-bg',
        properties: {
          translateY: { scalar: 0.2 }
        },
        triggerOffset: 0,
        duration: 'smooth'
      }
    ];
    this.init();
  }

  private init() {
    // Cache DOM elements
    this.config.forEach(item => {
      const elements = document.querySelectorAll(item.selector);
      if (elements.length > 0) {
        this.elements.set(item.selector, elements);
      }
    });

    if (!this.isInitialized) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.isInitialized = true;
    }

    // Initial render
    this.handleScroll();
  }

  private handleScroll() {
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    this.config.forEach(item => {
      const elements = this.elements.get(item.selector);
      if (!elements) return;

      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        
        // Check if element is in viewport with offset
        const isInView = (
          rect.top < windowHeight + item.triggerOffset &&
          rect.bottom > -item.triggerOffset
        );

        if (!isInView) return;

        // Calculate progress (0 to 1)
        const progress = Math.max(0, Math.min(1, 
          (scrollY + windowHeight - elementTop) / (windowHeight + elementHeight)
        ));

        // Apply transformations
        const transforms: string[] = [];
        const filters: string[] = [];
        let opacity = '';

        Object.entries(item.properties).forEach(([property, config]) => {
          const value = this.calculateValue(config, scrollY, progress);

          switch (property) {
            case 'translateY':
              transforms.push(`translateY(${value}px)`);
              break;
            case 'translateX':
              transforms.push(`translateX(${value}px)`);
              break;
            case 'rotate':
              transforms.push(`rotate(${value}deg)`);
              break;
            case 'scale':
              transforms.push(`scale(${value})`);
              break;
            case 'opacity':
              opacity = value.toString();
              break;
            case 'blur':
              filters.push(`blur(${value}px)`);
              break;
          }
        });

        // Apply styles
        const htmlElement = element as HTMLElement;
        if (transforms.length > 0) {
          htmlElement.style.transform = transforms.join(' ');
        }
        if (filters.length > 0) {
          htmlElement.style.filter = filters.join(' ');
        }
        if (opacity) {
          htmlElement.style.opacity = opacity;
        }

        // Ensure smooth transitions
        if (item.duration === 'smooth') {
          htmlElement.style.willChange = 'transform, opacity, filter';
        }
      });
    });
  }

  private calculateValue(config: ParallaxProperty, scrollY: number, progress: number): number {
    if (config.scalar !== undefined) {
      return scrollY * config.scalar;
    }
    
    if (config.from !== undefined && config.to !== undefined) {
      return config.from + (config.to - config.from) * progress;
    }
    
    return 0;
  }

  public updateConfig(newConfig: ParallaxConfig[]) {
    this.config = newConfig;
    this.elements.clear();
    this.init();
  }

  public destroy() {
    if (this.isInitialized) {
      window.removeEventListener('scroll', this.handleScroll);
      this.isInitialized = false;
    }
    this.elements.clear();
  }

  public addElement(selector: string, config: Omit<ParallaxConfig, 'selector'>) {
    const fullConfig: ParallaxConfig = { selector, ...config };
    this.config.push(fullConfig);
    
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      this.elements.set(selector, elements);
    }
  }
}

export default ParallaxEngine;