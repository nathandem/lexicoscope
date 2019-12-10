import PropTypes from 'prop-types';
import React from 'react';
import { FormGroup, H4, MenuItem, Switch } from '@blueprintjs/core';
import { MultiSelect } from '@blueprintjs/select';

import EnhancedSingleSelect from '../../../common/EnhancedSingleSelect';


export default class OccurrencesParams extends React.PureComponent {

  handleSingleSelectChange = (e) => {
    const { name, value } = e.target;
    this.props.onValueChange('occurrencesParamValues', name, value);
  }

  handleChangeItemToList = (paramName, item) => {
    const paramList = this.props.values[paramName];

    let newParamList;
    if (!paramList.includes(item)) {
      newParamList = [...paramList, item];
    } else {
      newParamList = paramList.filter(el => el !== item);
    }

    this.props.onValueChange('occurrencesParamValues', paramName, newParamList);
  }

  handleBoolToTextChange = (e) => {
    const name = e.target.name;

    console.log(`in handleBoolToTextChange, ${name} new value: ${!this.props.values[name]}`);

    const newBoolValue = !this.props.values[name];
    const newIntValue = newBoolValue ? 1 : 0;
    this.props.onValueChange('occurrencesParamValues', name, newIntValue);
  }

  render() {

    const {
      nodeMaskType,
      nodeMaskFeatures,
      collocMaskFeatures,
      kwicNode,
      dispCriterion,
    } = this.props.values;

    const fromPivotOnly = this.props.values.fromPivotOnly ? true : false;
    const computeEstimatedFreq = this.props.values.computeEstimatedFreq ? true : false;

    return (
      <>
        <H4><u>Définition des réalisations du pivot et des collocatifs</u></H4>

        <EnhancedSingleSelect
          label="Type de réalisation"
          helperText="comme réalisation de surface, comme instanciation de la requête, comme sous-arbre contenant les éléments de la requête"
          options={['surface', 'query', 'tree']}
          name='nodeMaskType'
          value={nodeMaskType}
          onChange={this.handleSingleSelectChange}
          popoverProps={{ minimal: true }}
        />

        <FormGroup
          label={"Traits pertinents dans le pivot"}
          helperText='("w"=>forme, "l"=>lemme, "c"=>catégorie, "f"=> autres traits)'
          inline={true}
        >
          <MultiSelect
            items={["w", "l", "c", "f"]}
            itemRenderer={
              (item, { handleClick, modifiers }) => (
                <MenuItem
                  key={item}
                  active={modifiers.active}
                  text={item}
                  icon={nodeMaskFeatures.includes(item) ? 'tick' : 'blank'}
                  onClick={handleClick}
                  shouldDismissPopover={false}
                />
              )
            }
            itemPredicate={(query, testedElement) => testedElement.includes(query)}
            onItemSelect={item => this.handleChangeItemToList('nodeMaskFeatures', item)}
            selectedItems={nodeMaskFeatures}
            tagInputProps={{
              interactive: true,
              onRemove: item => this.handleChangeItemToList('nodeMaskFeatures', item),
            }}
            tagRenderer={item => item}
            noResults={<MenuItem disabled={true} text="No result." />}
          />
        </FormGroup>

        <FormGroup
          label={"Traits pertinents dans les collocatifs"}
          helperText='("w"=>forme, "l"=>lemme, "c"=>catégorie, "f"=> autres traits, "r"=> relation de dépendances, "textP"=> position dans le texte, "divP"=> position dans la division, "paraP"=>position dans le paragraphe, "sentP"=>position dans la phrase )'
          inline={true}
        >
          <MultiSelect
            items={["w", "l", "c", "f", "r", "sentP", "paraP", "divP", "txtP"]}
            itemRenderer={
              (item, { handleClick, modifiers }) => (
                <MenuItem
                  key={item}
                  active={modifiers.active}
                  text={item}
                  icon={collocMaskFeatures.includes(item) ? 'tick' : 'blank'}
                  onClick={handleClick}
                  shouldDismissPopover={false}
                />
              )
            }
            itemPredicate={(query, testedElement) => testedElement.includes(query)}
            onItemSelect={item => this.handleChangeItemToList('collocMaskFeatures', item)}
            selectedItems={collocMaskFeatures}
            tagInputProps={{
              interactive: true,
              onRemove: item => this.handleChangeItemToList('collocMaskFeatures', item),
            }}
            tagRenderer={item => item}
            noResults={<MenuItem disabled={true} text="No result." />}
          />
        </FormGroup>

        <H4><u>Affichage Kwic</u></H4>

        <EnhancedSingleSelect
          label="Format de la colonne centrale des sorties Kwic"
          helperText="(token #1 ou expression complète)"
          options={["#1", "full"]}
          name='kwicNode'
          value={kwicNode}
          onChange={this.handleSingleSelectChange}
          popoverProps={{ minimal: true }}
        />

        <H4><u>Paramètres de calcul</u></H4>

        <Switch
          checked={fromPivotOnly}
          name="fromPivotOnly"
          label="Ne tenir compte que des cooccurrents en relation avec #1"
          alignIndicator='right'
          onChange={this.handleBoolToTextChange}
        />

        <Switch
          checked={computeEstimatedFreq}
          name="computeEstimatedFreq"
          label="Dans le cas d'une analyse incomplète (échantillonnage du corpus), calculer une valeur estimée des occurrences en se basant sur la taille de l'échantillon"
          alignIndicator='right'
          onChange={this.handleBoolToTextChange}
        />

        <EnhancedSingleSelect
          label="Critère de calcul de la dispersion"
          options={["file", "doc", "author", "year", "title", "sub_genre", "decade", "any"]}
          name='dispCriterion'
          value={dispCriterion}
          onChange={this.handleSingleSelectChange}
          popoverProps={{ minimal: true }}
        />

      </>
    );
  }
}

OccurrencesParams.propTypes = {
  values: PropTypes.shape({
    nodeMaskType: PropTypes.string,
    nodeMaskFeatures: PropTypes.arrayOf(PropTypes.string),
    collocMaskFeatures: PropTypes.arrayOf(PropTypes.string),
    kwicNode: PropTypes.string,
    fromPivotOnly: PropTypes.number,
    computeEstimatedFreq: PropTypes.number,
    dispCriterion: PropTypes.string,
  }),
  onValueChange: PropTypes.func,
};
