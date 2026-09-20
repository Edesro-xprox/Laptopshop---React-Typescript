import type { AccordionProps } from "../types/DetailType";


function Accordion({ title, description, specs }: AccordionProps) {
  const hasSpecs = Array.isArray(specs) && specs.length > 0;

  return (
    <div className="accordion-wrapper">
      <details className="custom-accordion" open>
        <summary>{title}</summary>
        <div className="accordion-content">
          {hasSpecs ? (
            <table className="table mb-0 spec-table">
              <tbody>
                {specs!.map((spec) => (
                  <tr key={spec.name}>
                    <th scope="row">{spec.name}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mb-0">{description}</p>
          )}
        </div>
      </details>
    </div>
  );
}

export default Accordion;
