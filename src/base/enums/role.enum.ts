export class ERole {
  static Public = "Public";
  static DashboardView = "DashboardView";

  // Kullanici İstekleri Rolleri
  static ContactView = "ContactView";
  static ContactMessage = "ContactMessage";
  static ContactAssign = "ContactAssign";
  static ContactMessageSuper = "ContactMessageSuper";
  static ContactMessageView = "ContactMessageView";
  static ContactMessageUpdate = "ContactMessageUpdate";

  // Tedarikçiler Rolleri
  static ProviderView = "ProviderView";
  static ProviderCreate = "ProviderCreate";
  static ProviderUpdate = "ProviderUpdate";
  static ProviderDelete = "ProviderDelete";

  // Tedarikci Faturalari Rolleri
  static ProviderInvoiceView = "ProviderInvoiceView";
  static ProviderInvoiceCreate = "ProviderInvoiceCreate";
  static ProviderInvoiceUpdate = "ProviderInvoiceUpdate";
  static ProviderInvoiceDelete = "ProviderInvoiceDelete";

  // Tedarikci Official Rolleri
  static ProviderOfficialView = "ProviderOfficialView";
  static ProviderOfficialCreate = "ProviderOfficialCreate";
  static ProviderOfficialUpdate = "ProviderOfficialUpdate";
  static ProviderOfficialDelete = "ProviderOfficialDelete";

  // Tedarikci Tipleri Rolleri
  static ProviderTypeView = "ProviderTypeView";
  static ProviderTypeCreate = "ProviderTypeCreate";
  static ProviderTypeUpdate = "ProviderTypeUpdate";
  static ProviderTypeDelete = "ProviderTypeDelete";

  // Tedarikci Adminleri Rolleri
  static ProviderAdminView = "ProviderAdminView";
  static ProviderAdminCreate = "ProviderAdminCreate";
  static ProviderAdminUpdate = "ProviderAdminUpdate";
  static ProviderAdminDelete = "ProviderAdminDelete";

  // Üyeler Rolleri
  static UserView = "UserView";
  static UserCreate = "UserCreate";
  static UserUpdate = "UserUpdate";
  static UserDelete = "UserDelete";

  // Yöneticiler Rolleri
  static AdminView = "AdminView";
  static AdminRole = "AdminRole";
  static AdminCreate = "AdminCreate";
  static AdminUpdate = "AdminUpdate";
  static AdminDelete = "AdminDelete";

  // Müşteriler Rolleri
  static CustomerView = "CustomerView";
  static CustomerCreate = "CustomerCreate";
  static CustomerUpdate = "CustomerUpdate";
  static CustomerDelete = "CustomerDelete";

  // İçerikler
  // Sözleşmeler Rolleri
  static ContractView = "ContractView";
  static ContractCreate = "ContractCreate";
  static ContractUpdate = "ContractUpdate";
  static ContractDelete = "ContractDelete";
  // Sayfalar Rolleri
  static DynamicComponentView = "DynamicComponentView";
  static DynamicComponentUpdate = "DynamicComponentUpdate";
  static DynamicComponentDelete = "DynamicComponentDelete";
  // Blog Rolleri
  static BlogView = "BlogView";
  static BlogCreate = "BlogCreate";
  static BlogUpdate = "BlogUpdate";
  static BlogDelete = "BlogDelete";
  // Dinamik Sayfalar Rolleri
  static DynamicPageView = "DynamicPageView";
  static DynamicPageCreate = "DynamicPageCreate";
  static DynamicPageUpdate = "DynamicPageUpdate";
  static DynamicPageDelete = "DynamicPageDelete";
  // SSS Rolleri
  static FaqView = "FaqView";
  static FaqCreate = "FaqCreate";
  static FaqUpdate = "FaqUpdate";
  static FaqDelete = "FaqDelete";

  // Ön Tanımlamalar Rolleri
  // Sektörler Rolleri
  static SectorView = "SectorView";
  static SectorCreate = "SectorCreate";
  static SectorUpdate = "SectorUpdate";
  static SectorDelete = "SectorDelete";
  // Adımlar Rolleri
  static StepView = "StepView";
  static StepUpdate = "StepUpdate";
  // Birimler Rolleri
  static UnitView = "UnitView";
  static UnitCreate = "UnitCreate";
  static UnitUpdate = "UnitUpdate";
  static UnitDelete = "UnitDelete";
  //Bankalar Rolleri
  static BankView = "BankView";
  static BankCreate = "BankCreate";
  static BankUpdate = "BankUpdate";
  static BankDelete = "BankDelete";

  // Değişkenler Rolleri
  static VariableView = "VariableView";
  static VariableCreate = "VariableCreate";
  static VariableUpdate = "VariableUpdate";
  static VariableDelete = "VariableDelete";

  // İş Kolları Rolleri
  static BusinessLineView = "BusinessLineView";
  static BusinessLineCreate = "BusinessLineCreate";
  static BusinessLineUpdate = "BusinessLineUpdate";
  static BusinessLineDelete = "BusinessLineDelete";
  static BusinessLineCopy = "BusinessLineCopy";
  static BusinessLineVariable = "BusinessLineVariable";

  // Hizmet Grupları Rolleri
  static ServiceGroupView = "ServiceGroupView";
  static ServiceGroupCreate = "ServiceGroupCreate";
  static ServiceGroupUpdate = "ServiceGroupUpdate";
  static ServiceGroupDelete = "ServiceGroupDelete";
  static ServiceGroupCopy = "ServiceGroupCopy";
  static ServiceGroupVariable = "ServiceGroupVariable";

  // Hizmetler Rolleri
  static ServiceView = "ServiceView";
  static ServiceCreate = "ServiceCreate";
  static ServiceUpdate = "ServiceUpdate";
  static ServiceDelete = "ServiceDelete";
  static ServiceCopy = "ServiceCopy";
  static ServiceVariable = "ServiceVariable";

  // Ürünler Rolleri
  static ProductView = "ProductView";
  static ProductCreate = "ProductCreate";
  static ProductUpdate = "ProductUpdate";
  static ProductDelete = "ProductDelete";
  static ProductCopy = "ProductCopy";
  static ProductVariable = "ProductVariable";

  // Agreement Category Roles
  static AgreementCategoryView = "AgreementCategoryView";
  static AgreementCategoryCreate = "AgreementCategoryCreate";
  static AgreementCategoryUpdate = "AgreementCategoryUpdate";
  static AgreementCategoryDelete = "AgreementCategoryDelete";
  static AgreementCategoryAssign = "AgreementCategoryAssign";
  static AgreementCategoryAgreementDelete = "AgreementCategoryAgreementDelete";
  static AgreementCategoryAgreementSortUpdate =
    "AgreementCategoryAgreementSortUpdate";
  // Agreement Roles
  static AgreementView = "AgreementView";
  static AgreementCreate = "AgreementCreate";
  static AgreementUpdate = "AgreementUpdate";
  static AgreementDelete = "AgreementDelete";
  static AgreementCopy = "AgreementCopy";
  static AgreementVariable = "AgreementVariable";

  // Agreement Step
  static AgreementStepView = "AgreementStepView";
  static AgreementStepCreate = "AgreementStepCreate";
  static AgreementStepUpdate = "AgreementStepUpdate";
  static AgreementStepDelete = "AgreementStepDelete";

  // Ayarlar
  // Genel Ayarlar Rolleri
  static GeneralSettingView = "GeneralSettingView";
  static GeneralSettingUpdate = "GeneralSettingUpdate";
  // E-Ticaret Ayarları Rolleri
  static EcommerceSettingView = "EcommerceSettingView";
  static EcommerceSettingUpdate = "EcommerceSettingUpdate";
  // Dosya Yönetimi Rolleri
  static FileManagerManegment = "FileManagerManegment";

  // Campaign Roles
  static CampaignView = "CampaignView";
  static CampaignCreate = "CampaignCreate";
  static CampaignUpdate = "CampaignUpdate";
  static CampaignDelete = "CampaignDelete";
  static CouponView = "CouponView";
  static CouponCreate = "CouponCreate";
  static CouponUpdate = "CouponUpdate";
  static CouponDelete = "CouponDelete";

  // Log Rolleri
  static LogView = "LogView";
}

export class ERolePath {
  static "/anasayfa" = ERole.DashboardView;
  static "/bildirimler" = ERole.Public;

  static "/istekler" = ERole.ContactView;
  static "/istekler/detay/:id" = ERole.ContactView;

  static "/talepler" = ERole.Public;
  static "/talepler/detay/:id" = ERole.Public;

  static "/tedarikciler" = ERole.ProviderView;
  static "/tedarikciler/ekle" = ERole.ProviderCreate;
  static "/tedarikciler/detay/:id/duzenle" = ERole.ProviderUpdate;

  static "/tedarikci-tipleri" = ERole.ProviderTypeView;
  static "/tedarikci-tipleri/ekle" = ERole.ProviderTypeCreate;
  static "/tedarikci-tipleri/detay/:id/duzenle" = ERole.ProviderTypeUpdate;

  static "/kullanicilar" = ERole.UserView;
  static "/kullanicilar/ekle" = ERole.UserCreate;
  static "/kullanicilar/duzenle/:id" = ERole.UserUpdate;
  static "/kullanicilar/yetki/:id" = ERole.UserUpdate;

  static "/yoneticiler" = ERole.AdminView;
  static "/yoneticiler/ekle" = ERole.AdminCreate;
  static "/yoneticiler/duzenle/:id" = ERole.AdminUpdate;
  static "/yoneticiler/yetki/:id" = ERole.AdminRole;

  static "/musteriler" = ERole.CustomerView;
  static "/musteriler/ekle" = ERole.CustomerCreate;
  static "/musteriler/duzenle/:id" = ERole.CustomerUpdate;

  static "/icerikler/sozlesmeler" = ERole.ContractView;
  static "/icerikler/sozlesmeler/ekle" = ERole.ContractCreate;
  static "/icerikler/sozlesmeler/duzenle/:id" = ERole.ContractUpdate;

  static "/icerikler/sayfalar" = ERole.DynamicPageView;
  static "/icerikler/sayfalar/ekle" = ERole.DynamicPageCreate;
  static "/icerikler/sayfalar/duzenle/:id" = ERole.DynamicPageUpdate;

  static "/icerikler/bilesenler" = ERole.DynamicComponentView;
  static "/icerikler/bilesenler/duzenle/:id" = ERole.DynamicComponentUpdate;

  static "/icerikler/blog-kategorileri" = ERole.BlogView;
  static "/icerikler/blog-kategorileri/ekle" = ERole.BlogCreate;
  static "/icerikler/blog-kategorileri/duzenle/:id" = ERole.BlogUpdate;

  static "/icerikler/bloglar" = ERole.BlogView;
  static "/icerikler/bloglar/ekle" = ERole.BlogCreate;
  static "/icerikler/bloglar/duzenle/:id" = ERole.BlogUpdate;

  static "/icerikler/soru-kategorileri" = ERole.FaqView;
  static "/icerikler/soru-kategorileri/ekle" = ERole.FaqCreate;
  static "/icerikler/soru-kategorileri/duzenle/:id" = ERole.FaqUpdate;

  static "/icerikler/sorular" = ERole.FaqView;
  static "/icerikler/sorular/ekle" = ERole.FaqCreate;
  static "/icerikler/sorular/duzenle/:id" = ERole.FaqUpdate;

  static "/on-tanimlamalar/sektorler" = ERole.SectorView;
  static "/on-tanimlamalar/sektorler/ekle" = ERole.SectorCreate;
  static "/on-tanimlamalar/sektorler/duzenle/:id" = ERole.SectorUpdate;

  static "/on-tanimlamalar/adimlar" = ERole.StepView;
  static "/on-tanimlamalar/adimlar/duzenle/:id" = ERole.StepUpdate;

  static "/on-tanimlamalar/birimler" = ERole.UnitView;
  static "/on-tanimlamalar/birimler/ekle" = ERole.UnitCreate;
  static "/on-tanimlamalar/birimler/duzenle/:id" = ERole.UnitUpdate;

  static "/on-tanimlamalar/bankalar/ekle" = ERole.BankCreate;
  static "/on-tanimlamalar/bankalar" = ERole.BankView;
  static "/on-tanimlamalar/bankalar/duzenle/:id" = ERole.BankUpdate;

  static "/degiskenler" = ERole.VariableView;
  static "/degiskenler/ekle" = ERole.Public;
  static "/degiskenler/duzenle/:id" = ERole.VariableUpdate;
  static "/degiskenler/kullanim-alanlari/:id" = ERole.VariableView;

  static "/is-kollari" = ERole.BusinessLineView;
  static "/is-kollari/ekle" = ERole.BusinessLineCreate;
  static "/is-kollari/detay/:id/duzenle" = ERole.BusinessLineUpdate;
  static "/is-kollari/detay/:id/degiskenler" = ERole.BusinessLineVariable;

  static "/hizmet-gruplari" = ERole.ServiceGroupView;
  static "/hizmet-gruplari/ekle" = ERole.ServiceGroupCreate;
  static "/hizmet-gruplari/detay/:id/duzenle" = ERole.ServiceGroupUpdate;
  static "/hizmet-gruplari/detay/:id/degiskenler" = ERole.ServiceGroupVariable;

  static "/hizmetler" = ERole.ServiceView;
  static "/hizmetler/ekle" = ERole.ServiceCreate;
  static "/hizmetler/detay/:id/duzenle" = ERole.ServiceUpdate;
  static "/hizmetler/detay/:id/degiskenler" = ERole.ServiceVariable;

  static "/urunler" = ERole.ProductView;
  static "/urunler/ekle" = ERole.ProductCreate;
  static "/urunler/detay/:product_id/duzenle" = ERole.ProductUpdate;
  static "/urunler/detay/:product_id/hizmetler" = ERole.ProductUpdate;
  static "/urunler/detay/:product_id/hizmetler/:id/degiskenler" =
    ERole.ProductVariable;
  static "/urunler/detay/:product_id/hizmetler/:id/teminatlar" =
    ERole.ProductUpdate;

  static "/sozlesme-gruplari/ekle" = ERole.AgreementCategoryCreate;
  static "/sozlesme-gruplari" = ERole.AgreementCategoryView;
  static "/sozlesme-gruplari/duzenle/:id" = ERole.AgreementCategoryUpdate;
  static "/sozlesme-gruplari/urun-atama/:id" = ERole.AgreementCategoryAssign;

  static "/sozlesmeler" = ERole.AgreementView;
  static "/sozlesmeler/ekle" = ERole.AgreementCreate;
  static "/sozlesmeler/detay/:agreement_id/duzenle" = ERole.AgreementUpdate;
  static "/sozlesmeler/detay/:agreement_id/hizmetler" = ERole.AgreementUpdate;
  static "/sozlesmeler/detay/:agreement_id/hizmetler/:id/degiskenler" =
    ERole.AgreementUpdate;
  static "/sozlesmeler/detay/:agreement_id/hizmetler/:id/teminatlar" =
    ERole.AgreementUpdate;
  static "/sozlesmeler/detay/:agreement_id/adimlar" = ERole.AgreementStepView;
  static "/sozlesmeler/detay/:agreement_id/adimlar/:step_id/duzenle" = ERole.AgreementStepUpdate;

  static "/ayarlar/sistem" = ERole.GeneralSettingView;
  static "/ayarlar/e-ticaret" = ERole.EcommerceSettingView;
  static "/ayarlar/kullanici" = ERole.GeneralSettingView;
  static "/ayarlar/kullanici/duzenle/:id" = ERole.GeneralSettingView;

  static "/kampanyalar" = ERole.CampaignView;
  static "/kampanyalar/ekle" = ERole.CampaignCreate;
  static "/kampanyalar/duzenle/:id" = ERole.CampaignUpdate;

  static "/kampanyalar/kuponlar/:id" = ERole.CouponView;
  static "/kampanyalar/kuponlar/:id/ekle" = ERole.CouponCreate;
  static "/kampanyalar/kuponlar/:id/duzenle/:coupon_id" = ERole.CouponUpdate;

  static "/dosya-yoneticisi" = ERole.FileManagerManegment;

  static "/loglar" = ERole.LogView;
}
