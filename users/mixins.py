from django.contrib.auth.mixins import AccessMixin
from django.urls import reverse_lazy
from django.shortcuts import redirect

class GroupRequiredMixin(AccessMixin):
    group_required = None
    permission_denied_url = reverse_lazy('login')

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return self.handle_no_permission()
        
        if self.group_required and not request.user.groups.filter(name=self.group_required).exists():
            return redirect(self.permission_denied_url)
        
        return super().dispatch(request, *args, **kwargs)