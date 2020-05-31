#import <UIKit/UIKit.h>
#import <MobileCoreServices/UTCoreTypes.h>
#import "Clipboard.h"

@implementation Clipboard

RCT_EXPORT_MODULE(BetterClipboard); // this is how our native module will be named

RCT_EXPORT_METHOD(addBase64Image:(NSString *)base64Image) {
  UIPasteboard *pasteboard = [UIPasteboard generalPasteboard];
  [pasteboard setPersistent:YES];
  
  NSData *imageData = [[NSData alloc]initWithBase64EncodedString:base64Image options:NSDataBase64DecodingIgnoreUnknownCharacters];

  [pasteboard setImage:[UIImage imageWithData:imageData]];
}

@end