from fasthtml.common import *

# Initialize the app with Tailwind CSS
app, rt = fast_app(hdrs=(Script(src='https://cdn.tailwindcss.com'),))

# Mock Data
menu_items = [
    {"name": "Cheesy Burger", "price": 180, "category": "Burgers", "is_veg": False},
    {"name": "Peri Peri Fries", "price": 120, "category": "Starters", "is_veg": True},
    {"name": "Hazelnut Frappe", "price": 150, "category": "Beverages", "is_veg": True}
]

# UI Components
def MenuCard(item):
    """
    Renders a card with the name, a Green/Red dot for veg/non-veg, and the price.
    """
    dot_color = "bg-green-500" if item["is_veg"] else "bg-red-500"
    
    return Div(
        Div(
            Div(cls=f"w-3 h-3 rounded-full {dot_color} mr-2 mt-1.5"), # Veg/Non-veg indicator
            H3(item["name"], cls="text-xl font-semibold text-gray-100"),
            cls="flex items-start"
        ),
        P(f"{item['category']}", cls="text-sm text-gray-400 mt-1"),
        Div(
            P(f"₹{item['price']}", cls="text-yellow-500 font-bold text-lg"),
            cls="mt-4 flex justify-end"
        ),
        cls="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg hover:border-yellow-500/50 transition-colors duration-300"
    )

def Footer():
    return Div(
        A(
            "📍 Navigate to Cafe",
            href="#", # Placeholder link
            cls="bg-yellow-500 text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors shadow-lg hover:shadow-yellow-500/20"
        ),
        cls="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 flex justify-center z-50"
    )

# Main Route
@rt('/')
def get():
    return Title("Hide & Seek Cafe"), Body(
        # Main Container
        Div(
            # Header
            Header(
                H1("Hide & Seek Cafe", cls="text-4xl font-bold text-yellow-500 mb-2"),
                P("Taste the mystery.", cls="text-gray-400 italic"),
                cls="text-center py-10"
            ),
            
            # Menu Grid
            Div(
                *[MenuCard(item) for item in menu_items],
                cls="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
            ),
            
            cls="min-h-screen bg-gray-900 text-gray-100 pb-24" # pb-24 to prevent footer overlap
        ),
        Footer()
    )

if __name__ == "__main__":
    serve()
