// autobind decorator
function autobind(
  _: unknown,
  _2: string,
  descriptor: PropertyDescriptor,
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const originalMethod: (evt: Event) => void = descriptor.value;

  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn: (evt: Event) => void = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;

  hostElement: HTMLDivElement;

  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;

  descriptionInputElement: HTMLInputElement;

  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input') as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @autobind
  private submitHandler(evt: Event): void {
    evt.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
