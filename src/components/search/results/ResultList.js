import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';

import ListView from './ListView';
import GridView from './GridView';

const Results = ({items}) => {
  const [isList = false, setIsList] = useState(false);

  const toggleListView = () => setIsList(!isList);

  return (
    <>
      <Row className="mb-5">
        <Col>
          <h4 className="mb-0 mt-2">Rezultate: { items.length }</h4>
        </Col>
        <Col className="text-right">
          Afisare: &nbsp;
          <Button color="link" onClick={toggleListView} disabled={!isList}>Coloane</Button> |
          <Button color="link" onClick={toggleListView} disabled={isList}>Lista</Button>
        </Col>
      </Row>
      {isList ?
        <ListView items={items} />
        : // isList === false
        <GridView items={items} />
      }
    </>
  );
};

Results.propTypes = {
  items: PropTypes.array,
};

export default Results;