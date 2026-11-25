import pytest

from inventory import Item, low_stock, restock_plan, total_value

ITEMS = [
    Item("KB-01", 3, 49.90),
    Item("MS-02", 12, 19.50),
    Item("HD-03", 5, 120.00, reorder_level=4),
]


def test_total_value():
    assert total_value(ITEMS) == 983.70


def test_total_value_empty():
    assert total_value([]) == 0


def test_low_stock_uses_reorder_level():
    assert low_stock(ITEMS) == ["KB-01"]


def test_restock_plan():
    assert restock_plan(ITEMS) == {"KB-01": 17, "MS-02": 8, "HD-03": 15}


def test_restock_plan_rejects_negative_target():
    with pytest.raises(ValueError):
        restock_plan(ITEMS, target=-1)
