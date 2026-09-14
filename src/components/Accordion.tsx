type AccordionProps = {
  title: string;
  description: string;
};

function Accordion({ title, description }: AccordionProps) {
  return (
    <div className="accordion-wrapper">
      <details className="custom-accordion" open>
        <summary>{title}</summary>
        <div className="accordion-content">
          <p className="mb-0">{description}</p>
        </div>
      </details>
    </div>
  );
}

export default Accordion;
