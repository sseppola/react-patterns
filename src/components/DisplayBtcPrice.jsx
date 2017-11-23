import React from 'react';
import PropTypes from 'prop-types';

const btcIndexPropType = PropTypes.shape({
  base: PropTypes.oneOf(['BTC']),
  currency: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
})


DisplayBtcPrice.propTypes = {
  loading: PropTypes.bool.isRequired,
  buy: btcIndexPropType,
  sell: btcIndexPropType,
  refresh: PropTypes.func.isRequired,
}

export function DisplayBtcPrice({ buy, sell, loading, refresh }) {
  return (
    <div style={{ cursor: 'pointer'}} onClick={refresh}>
      <p>Buy: {buy.amount} {buy.currency}</p>
      <p>Sell: {sell.amount} {sell.currency}</p>
      {loading && (
        <p className="f6">loading..</p>
      )}
  </div>
  );
}