// Preserva o contexto do pedido de orçamento ao abrir o WhatsApp.
// Se um gerenciador de tags for instalado, o evento whatsapp_click fica disponível no dataLayer.
document.addEventListener('click', function (event) {
  const link = event.target.closest('a[href^="https://wa.me/5548991520331"]');
  if (!link) return;

  const params = new URLSearchParams(window.location.search);
  const paidSearch = params.has('gclid') ||
    (params.get('utm_source') || '').toLowerCase() === 'google' &&
    ['cpc', 'paid', 'ppc'].includes((params.get('utm_medium') || '').toLowerCase());
  const service = document.body.dataset.service || 'um serviço de carpintaria';
  const origin = paidSearch ? 'um anúncio no Google' : 'o site da JP Carpintaria';
  const message = `Olá, vi ${origin} e gostaria de pedir um orçamento para ${service}.`;

  link.href = 'https://wa.me/5548991520331?text=' + encodeURIComponent(message);
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'whatsapp_click', service: service, origem: paidSearch ? 'google_ads' : 'site' });
});
