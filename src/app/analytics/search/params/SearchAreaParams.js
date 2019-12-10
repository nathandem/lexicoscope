import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, H4, NumericInput } from '@blueprintjs/core';


export default class SearchAreaParams extends React.PureComponent {


  render() {

    const {
      maxElapsedTime,
      nbMax2Parse,
      percent2Parse,
      nbMaxFound,
    } = this.props.values;
    const { onValueChange } = this.props;

    const formGroupStyle = {
      display: 'flex',
      justifyContent: 'space-between',
    };

    return (
      <>
        <H4><u>Scope of sentences to analyse</u></H4>

        <FormGroup
          helperText="0 si pas de limite"
          label="Durée maximale pour une requête"
          labelInfo="(en secondes)"
          inline={true}
          style={formGroupStyle}
        >
          <NumericInput
            min={0} buttonPosition={null}
            value={maxElapsedTime}
            onValueChange={(newValue) => onValueChange('searchAreaParamValues', 'maxElapsedTime', newValue)}
          />
        </FormGroup>

        <FormGroup
          helperText="0 si pas de limite"
          label="Nombre maximal de phrases à parser"
          inline={true}
          style={formGroupStyle}
        >
          <NumericInput
            min={0} buttonPosition={null}
            value={nbMax2Parse}
            onValueChange={(newValue) => onValueChange('searchAreaParamValues', 'nbMax2Parse', newValue)}
          />
        </FormGroup>

        <FormGroup
          helperText="entre 0 et 100"
          label="Pourcentage de phrases à parser"
          labelInfo="(sur l'ensemble de recherche)"
          inline={true}
          style={formGroupStyle}
        >
          <NumericInput
            buttonPosition={null}
            value={percent2Parse}
            onValueChange={(newValue) => onValueChange('searchAreaParamValues', 'percent2Parse', newValue)}
          />
        </FormGroup>

        <FormGroup
          helperText="0 si pas de limite"
          label="Mombre maximal d'occurrences dans les résultats"
          inline={true}
          style={formGroupStyle}
        >
          <NumericInput
            min={0} buttonPosition={null}
            value={nbMaxFound}
            onValueChange={(newValue) => onValueChange('searchAreaParamValues', 'nbMaxFound', newValue)}
          />
        </FormGroup>
      </>
    );
  }
}

SearchAreaParams.propTypes = {
  values: PropTypes.shape({
    maxElapsedTime: PropTypes.number,
    nbMax2Parse: PropTypes.number,
    percent2Parse: PropTypes.number,
    nbMaxFound: PropTypes.number,
  }),
  onValueChange: PropTypes.func,
};
