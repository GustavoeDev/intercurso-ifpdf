from django import template

register = template.Library()

@register.filter
def startswith(text, starts):
    if isinstance(text, str) and isinstance(starts, str):
        return text.startswith(starts)
    return False