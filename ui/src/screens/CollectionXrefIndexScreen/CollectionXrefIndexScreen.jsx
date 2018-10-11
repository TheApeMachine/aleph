import React, { Component } from 'react';
import { connect } from "react-redux";
import { injectIntl, defineMessages } from 'react-intl';

import CollectionScreenContext from 'src/components/Collection/CollectionScreenContext';
import CollectionXrefIndexMode from 'src/components/Collection/CollectionXrefIndexMode';
import { selectCollection } from 'src/selectors';

const messages = defineMessages({
  screen_title: {
    id: 'collection.xref.index.title',
    defaultMessage: 'Cross-reference',
  }
});

class CollectionXrefIndexScreen extends Component {
  render() {
    const { intl, collection, collectionId } = this.props;
    collection.id = collectionId;

    return (
      <CollectionScreenContext collectionId={collectionId}
                               activeMode="xref"
                               screenTitle={intl.formatMessage(messages.screen_title)}>
        <CollectionXrefIndexMode collection={collection} />
      </CollectionScreenContext>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { collectionId } = ownProps.match.params;
  return {
    collectionId,
    collection: selectCollection(state, collectionId)
  };
};

CollectionXrefIndexScreen = injectIntl(CollectionXrefIndexScreen);
CollectionXrefIndexScreen = connect(mapStateToProps, {})(CollectionXrefIndexScreen);
export default CollectionXrefIndexScreen;
