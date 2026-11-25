from dataclasses import dataclass


@dataclass(frozen=True)
class Item:
    sku: str
    quantity: int
    unit_price: float
    reorder_level: int = 5


def total_value(items):
    return round(sum(i.quantity * i.unit_price for i in items), 2)


def low_stock(items):
    return [i.sku for i in items if i.quantity <= i.reorder_level]


def restock_plan(items, target=20):
    if target < 0:
        raise ValueError("target must be zero or positive")
    return {i.sku: target - i.quantity for i in items if i.quantity < target}
