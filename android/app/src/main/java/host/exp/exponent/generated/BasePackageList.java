package host.exp.exponent.generated;

import java.util.Arrays;
import java.util.List;
import org.unimodules.core.interfaces.Package;

public class BasePackageList {
  public List<Package> getPackageList() {
    return Arrays.<Package>asList(
        new expo.modules.ads.facebook.AdsFacebookPackage(),
        new expo.modules.constants.ConstantsPackage(),
        new expo.modules.crypto.CryptoPackage(),
        new expo.modules.filesystem.FileSystemPackage(),
        new expo.modules.font.FontLoaderPackage(),
        new expo.modules.keepawake.KeepAwakePackage(),
        new expo.modules.lineargradient.LinearGradientPackage(),
        new expo.modules.location.LocationPackage(),
        new expo.modules.permissions.PermissionsPackage(),
        new expo.modules.securestore.SecureStorePackage(),
        new expo.modules.sharing.SharingPackage(),
        new expo.modules.sqlite.SQLitePackage(),
        new expo.modules.webbrowser.WebBrowserPackage()
    );
  }
}