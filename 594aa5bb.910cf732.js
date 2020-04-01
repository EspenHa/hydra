(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{151:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return c})),t.d(n,"metadata",(function(){return s})),t.d(n,"rightToc",(function(){return l})),t.d(n,"default",(function(){return p}));var a=t(1),o=t(9),r=(t(0),t(200)),c={id:"objects",title:"Creating objects and calling functions",sidebar_label:"Creating objects and calling functions"},s={id:"patterns/objects",title:"Creating objects and calling functions",description:"### Instantiating objects and calling methods and functions",source:"@site/docs/patterns/objects.md",permalink:"/docs/next/patterns/objects",editUrl:"https://github.com/facebookresearch/hydra/edit/master/website/docs/patterns/objects.md",version:"next",lastUpdatedBy:"Omry Yadan",lastUpdatedAt:1585776995,sidebar_label:"Creating objects and calling functions",sidebar:"Docs",previous:{title:"Config Store API",permalink:"/docs/next/tutorials/structured_config/config_store"},next:{title:"Specializing configuration",permalink:"/docs/next/patterns/specializing_config"}},l=[{value:"Instantiating objects and calling methods and functions",id:"instantiating-objects-and-calling-methods-and-functions",children:[]},{value:"Real World Example",id:"real-world-example",children:[]}],i={rightToc:l};function p(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},i,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h3",{id:"instantiating-objects-and-calling-methods-and-functions"},"Instantiating objects and calling methods and functions"),Object(r.b)("p",null,"Use ",Object(r.b)("inlineCode",{parentName:"p"},"hydra.utils.call()")," (or its alias ",Object(r.b)("inlineCode",{parentName:"p"},"hydra.utils.instantiate()"),") to instantiate objects, call functions and call class methods."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"def call(config: PluginConf, *args: Any, **kwargs: Any) -> Any:\n")),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"config"),": A config node describing the class to instantiate or function to call and the parameters to pass"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"args"),": optional positional passthrough"),Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"kwargs"),": optional named parameters passthrough")),Object(r.b)("p",null,"Example config node:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"# target class name, function name or class method fully qualified name\ncls: foo.Bar\n# optional parameters dictionary to pass when calling the target\nparams:\n  x: 10\n")),Object(r.b)("h4",{id:"example-usage"},"Example usage"),Object(r.b)("p",null,"models.py"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),"class Foo:\n  def __init__(x: int, y: int) -> None:\n    self.x = x\n    self.y = y\n\n  @classmethod\n  def class_method(self, z: int) -> Any:\n    return self(z, 10)\n\n  @staticmethod\n  def static_method(z: int) -> int:\n    return z + 1\n\ndef bar(z: int) -> int:\n  return z + 2\n")),Object(r.b)("p",null,"config.yaml"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"myobject:\n  cls: models.Foo\n  params:\n    x: 10\n    y: 20\n    \nmyclassmethod:\n  cls: models.Foo.class_method\n  params:\n    z: 5\n\nmystaticmethod:\n  cls: models.Foo.static_method\n  params:\n    z: 15\n\nmyfunction:\n  cls: models.bar\n  params:\n    z: 15\n")),Object(r.b)("p",null,"Now to test these instantiate / call them as follows:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'import hydra\n\n@hydra.main(config_path="config.yaml")\ndef app(cfg):\n  foo1: Foo = hydra.utils.call(cfg.myobject)  # Foo(10, 20)\n  foo2: Foo = hydra.utils.call(cfg.myclassmethod)  # Foo(5, 10)\n  ret1: int = hydra.utils.call(cfg.mystaticmethod)  # 16\n  ret2: int = hydra.utils.call(cfg.myfunction)  # 17\n')),Object(r.b)("h3",{id:"real-world-example"},"Real World Example"),Object(r.b)("p",null,"One of the best ways to drive different behavior in the application is to instantiate different implementations of an interface.\nThe code using the instantiated object only knows the interface which remains constant, but the behavior\nis determined by the actual object instance."),Object(r.b)("p",null,"A Database connection interface may have a ",Object(r.b)("inlineCode",{parentName:"p"},"connect()")," method, implemented by different database drivers."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'class DBConnection:\n    def connect(self):\n        pass\n\nclass MySQLConnection(DBConnection):\n    def __init__(self, host, user, password):\n        self.host = host\n        self.user = user\n        self.password = password\n\n    def connect(self):\n        print(\n            "MySQL connecting to {} with user={} and password={}".format(\n                self.host, self.user, self.password\n            )\n        )\n\nclass PostgreSQLConnection(DBConnection):\n    def __init__(self, host, user, password, database):\n        self.host = host\n        self.user = user\n        self.password = password\n        self.database = database\n\n    def connect(self):\n        print(\n            "PostgreSQL connecting to {} "\n            "with user={} and password={} and database={}".format(\n                self.host, self.user, self.password, self.database\n            )\n        )\n')),Object(r.b)("p",null,"To support this, we can have a parallel config structure:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"conf/\n\u251c\u2500\u2500 config.yaml\n\u2514\u2500\u2500 db\n    \u251c\u2500\u2500 mysql.yaml\n    \u2514\u2500\u2500 postgresql.yaml\n")),Object(r.b)("p",null,"Config file: ",Object(r.b)("inlineCode",{parentName:"p"},"config.yaml")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"defaults:\n  - db: mysql\n")),Object(r.b)("p",null,"Config file: ",Object(r.b)("inlineCode",{parentName:"p"},"db/mysql.yaml")),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"db:\n  cls: tutorial.objects_example.objects.MySQLConnection\n  params:\n    host: localhost\n    user: root\n    password: 1234\n")),Object(r.b)("p",null,"db/postgresql.yaml:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-yaml"}),"db:\n  cls: tutorial.objects_example.objects.PostgreSQLConnection\n  params:\n    host: localhost\n    user: root\n    password: 1234\n    database: tutorial\n")),Object(r.b)("p",null,"With this, you can instantiate the object from the configuration with a single line of code:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-python"}),'@hydra.main(config_path="conf/config.yaml")\ndef my_app(cfg):\n    connection = hydra.utils.instantiate(cfg.db)\n    connection.connect()\n')),Object(r.b)("p",null,"MySQL is the default per the ",Object(r.b)("inlineCode",{parentName:"p"},"config.yaml")," file:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"$ python my_app.py\nMySQL connecting to localhost with user=root and password=1234\n")),Object(r.b)("p",null,"Change the instantiated object class and override values from the command line:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-text"}),"$ python my_app.py db=postgresql db.params.password=abcde\nPostgreSQL connecting to localhost with user=root and password=abcde and database=tutorial\n")))}p.isMDXComponent=!0},200:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return m}));var a=t(0),o=t.n(a);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function c(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?c(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},r=Object.keys(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)t=r[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=o.a.createContext({}),p=function(e){var n=o.a.useContext(i),t=n;return e&&(t="function"==typeof e?e(n):s({},n,{},e)),t},b=function(e){var n=p(e.components);return o.a.createElement(i.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},u=Object(a.forwardRef)((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,c=e.parentName,i=l(e,["components","mdxType","originalType","parentName"]),b=p(t),u=a,m=b["".concat(c,".").concat(u)]||b[u]||d[u]||r;return t?o.a.createElement(m,s({ref:n},i,{components:t})):o.a.createElement(m,s({ref:n},i))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,c=new Array(r);c[0]=u;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,c[1]=s;for(var i=2;i<r;i++)c[i]=t[i];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);