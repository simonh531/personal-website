import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className }) => (
  <svg
    viewBox="0 0 155.88457268119895641747017073553 285"
    className={className}
  >
    <path
      d="M 77.942286340599478208735085367764,180
         l -77.942286340599478208735085367764,-45
         0,-90
         77.942286340599478208735085367764,-45
         77.942286340599478208735085367764,45
         0,90
         -25.980762113533159402911695122588,-15
         0,-60
         -51.961524227066318805823390245176,-30
         -51.961524227066318805823390245176,30
         0,60
         51.961524227066318805823390245176,30
         z"
      fill="#284a70"
    />
    <path
      d="M 77.942286340599478208735085367764,105
         l 77.942286340599478208735085367764,45
         0,90
         -77.942286340599478208735085367764,45
         -77.942286340599478208735085367764,-45
         0,-90
         25.980762113533159402911695122588,15
         0,60
         51.961524227066318805823390245176,30
         51.961524227066318805823390245176,-30
         0,-60
         -51.961524227066318805823390245176,-30
         z"
      fill="#284a70"
    />
    <path
      d="M 77.942286340599478208735085367764,0
         l 77.942286340599478208735085367764,45
         -25.980762113533159402911695122588,15
         -51.961524227066318805823390245176,-30
         -51.961524227066318805823390245176,30
         -25.980762113533159402911695122588,-15
         z"
      fill="#ce990e"
    />
    <path
      d="M 77.942286340599478208735085367764,285
         l 77.942286340599478208735085367764,-45
         -25.980762113533159402911695122588,-15
         -51.961524227066318805823390245176,30
         -51.961524227066318805823390245176,-30
         -25.980762113533159402911695122588,15
         z"
      fill="#ce990e"
    />
  </svg>
);

Logo.propTypes = {
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: null,
};

export default Logo;