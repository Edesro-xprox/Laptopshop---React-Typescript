type SpecItem = {
  name: string;
  value: string;
};

type AccordionProps = {
  title: string;
  description?: string;
  specs?: SpecItem[];
};


export type { SpecItem, AccordionProps };