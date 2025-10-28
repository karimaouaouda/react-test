/**
 * PropTypes definitions for Timeline components
 * Install: npm install prop-types
 */

import PropTypes from 'prop-types';

// Event shape
export const EventPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['etape', 'card']).isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  color: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
});

// Template step shape
export const TemplateStepPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  duree: PropTypes.number.isRequired,
  date: PropTypes.string,
});

// Search option shape
export const SearchOptionPropType = PropTypes.shape({
  kind: PropTypes.oneOf(['etape', 'template', 'card', 'new']).isRequired,
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  steps_count: PropTypes.number,
});
