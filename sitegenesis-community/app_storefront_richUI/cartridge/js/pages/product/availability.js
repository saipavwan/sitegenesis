'use strict';

var ajax =  require('../../ajax'),
	util = require('../../util');

var updateContainer = function (data) {
	var $availabilityMsgContainer = $('#pdpMain .availability .availability-msg'),
		$availabilityMsg;
	if (!data) {
		$availabilityMsgContainer.html(Resources.ITEM_STATUS_NOTAVAILABLE);
		return;
	}

	$availabilityMsgContainer.empty();

	// Look through levels ... if msg is not empty, then create span el
	if (data.levels.IN_STOCK > 0) {
		$availabilityMsg = $availabilityMsgContainer.find('.in-stock-msg');
		if ($availabilityMsg.length === 0) {
			$availabilityMsg = $('<p/>').addClass('in-stock-msg');
		}
		if (data.levels.PREORDER === 0 && data.levels.BACKORDER === 0 && data.levels.NOT_AVAILABLE === 0) {
			// Just in stock
			$availabilityMsg.text(Resources.IN_STOCK);
		} else {
			// In stock with conditions ...
			$availabilityMsg.text(data.inStockMsg);
		}
	}
	if (data.levels.PREORDER > 0) {
		$availabilityMsg = $availabilityMsgContainer.find('.preorder-msg');
		if ($availabilityMsg.length === 0) {
			$availabilityMsg = $('<p/>').addClass('preorder-msg');
		}
		if (data.levels.IN_STOCK === 0 && data.levels.BACKORDER === 0 && data.levels.NOT_AVAILABLE === 0) {
			// Just in stock
			$availabilityMsg.text(Resources.PREORDER);
		} else {
			$availabilityMsg.text(data.preOrderMsg);
		}
	}
	if (data.levels.BACKORDER > 0) {
		$availabilityMsg = $availabilityMsgContainer.find('.backorder-msg');
		if ($availabilityMsg.length === 0) {
			$availabilityMsg = $('<p/>').addClass('backorder-msg');
		}
		if (data.levels.IN_STOCK === 0 && data.levels.PREORDER === 0 && data.levels.NOT_AVAILABLE === 0) {
			// Just in stock
			$availabilityMsg.text(Resources.BACKORDER);
		} else {
			$availabilityMsg.text(data.backOrderMsg);
		}
	}
	if (data.inStockDate !== '') {
		$availabilityMsg = $availabilityMsgContainer.find('.in-stock-date-msg');
		if ($availabilityMsg.length === 0) {
			$availabilityMsg = $('<p/>').addClass('in-stock-date-msg');
		}
		$availabilityMsg.text(String.format(Resources.IN_STOCK_DATE, data.inStockDate));
	}
	if (data.levels.NOT_AVAILABLE > 0) {
		$availabilityMsg = $availabilityMsgContainer.find('.not-available-msg');
		if ($availabilityMsg.length === 0) {
			$availabilityMsg = $('<p/>').addClass('not-available-msg');
		}
		if (data.levels.PREORDER === 0 && data.levels.BACKORDER === 0 && data.levels.IN_STOCK === 0) {
			$availabilityMsg.text(Resources.NOT_AVAILABLE);
		} else {
			$availabilityMsg.text(Resources.REMAIN_NOT_AVAILABLE);
		}
	}

	$availabilityMsgContainer.append($availabilityMsg);
};

var getAvailability = function () {
	ajax.getJson({
		url: util.appendParamsToUrl(Urls.getAvailability, {
			pid: $('#pid').val(),
			Quantity: $(this).val()
		}),
		callback: updateContainer
	});
};

module.exports = function () {
	$('#pdpMain').on('change', '.pdpForm input[name="Quantity"]', getAvailability);
};
