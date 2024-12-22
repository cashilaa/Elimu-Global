import React from 'react';

const Accordion = ({ children }) => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
          isOpen: openIndex === index,
          toggle: () => toggle(index),
        });
      })}
    </div>
  );
};

const AccordionItem = ({ isOpen, toggle, children }) => {
  return (
    <div className="accordion-item">
      <div className="accordion-trigger" onClick={toggle}>
        {children[0]}
      </div>
      {isOpen && <div className="accordion-content">{children[1]}</div>}
    </div>
  );
};

const AccordionContent = ({ isOpen, children }) => {
  return <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>{children}</div>;
};

const AccordionTrigger = ({ children, toggle }) => {
  return (
    <button className="accordion-trigger" onClick={toggle}>
      {children}
    </button>
  );
};

export { Accordion, AccordionItem, AccordionContent, AccordionTrigger };
