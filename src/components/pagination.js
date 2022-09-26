/* eslint-disable jsx-a11y/accessible-emoji */

import { Button } from "react-bootstrap";

export const Pagination = ({ activePage, totalPages, setActivePage }) => {
  return (
    <>
      {/* custom pagination  */}
      <div className="pagination">
        <Button
          disabled={activePage === 1}
          onClick={() => setActivePage(1)}
          className="ms-2"
        >
          First
        </Button>
        <Button
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(activePage + 1)}
        >
          Next
        </Button>
        <Button
          disabled={activePage === totalPages}
          onClick={() => setActivePage(totalPages)}
        >
          Last
        </Button>
      </div>
      <p className="text-center mt-2">
        Page {activePage} of {totalPages}
      </p>
    </>
  );
};
