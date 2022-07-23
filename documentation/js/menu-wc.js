'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">goodfood documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AuthModule-75fc2be1114dea36d0c068cba7b8f4cb1ae3996d3fe1fc8febb5f6fb34ceec095d1e65f5d3f0ad8475dc69c913fc4c356f03e5074d716b385dbdbf8397ce31ed"' : 'data-target="#xs-components-links-module-AuthModule-75fc2be1114dea36d0c068cba7b8f4cb1ae3996d3fe1fc8febb5f6fb34ceec095d1e65f5d3f0ad8475dc69c913fc4c356f03e5074d716b385dbdbf8397ce31ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-75fc2be1114dea36d0c068cba7b8f4cb1ae3996d3fe1fc8febb5f6fb34ceec095d1e65f5d3f0ad8475dc69c913fc4c356f03e5074d716b385dbdbf8397ce31ed"' :
                                            'id="xs-components-links-module-AuthModule-75fc2be1114dea36d0c068cba7b8f4cb1ae3996d3fe1fc8febb5f6fb34ceec095d1e65f5d3f0ad8475dc69c913fc4c356f03e5074d716b385dbdbf8397ce31ed"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ComponentsModule.html" data-type="entity-link" >ComponentsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ComponentsModule-e915c08239475baa4c74db70cc9e2c5ce3d36549012f68d320eb7dd71f8f5b483b03263ab19ec2032a5907b01ea4cefd0d158d341617cfdf00b4af3a89166602"' : 'data-target="#xs-components-links-module-ComponentsModule-e915c08239475baa4c74db70cc9e2c5ce3d36549012f68d320eb7dd71f8f5b483b03263ab19ec2032a5907b01ea4cefd0d158d341617cfdf00b4af3a89166602"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ComponentsModule-e915c08239475baa4c74db70cc9e2c5ce3d36549012f68d320eb7dd71f8f5b483b03263ab19ec2032a5907b01ea4cefd0d158d341617cfdf00b4af3a89166602"' :
                                            'id="xs-components-links-module-ComponentsModule-e915c08239475baa4c74db70cc9e2c5ce3d36549012f68d320eb7dd71f8f5b483b03263ab19ec2032a5907b01ea4cefd0d158d341617cfdf00b4af3a89166602"' }>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ServerErrorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServerErrorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TitleComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TitleComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TopbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TopbarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DefaultModule.html" data-type="entity-link" >DefaultModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' : 'data-target="#xs-components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' :
                                            'id="xs-components-links-module-DefaultModule-b9fb0cbb2a474b99de02a40f11992ef05912b86d673a0f6a1b19da5d292df4f0d08696b2178853d207e6d41530f5679aebedc4f3f2b19f7816184a6289294d46"' }>
                                            <li class="link">
                                                <a href="components/DefaultComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DefaultComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FranchiseeModule.html" data-type="entity-link" >FranchiseeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' : 'data-target="#xs-components-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' :
                                            'id="xs-components-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' }>
                                            <li class="link">
                                                <a href="components/FranchiseeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FranchiseeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FranchiseeDetailComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FranchiseeDetailComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FranchiseeDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FranchiseeDialogComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' : 'data-target="#xs-injectables-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' :
                                        'id="xs-injectables-links-module-FranchiseeModule-e6765c83a980e5674cd1ea7db6c4aab16e637b237a58c001570c9ca7fa1f5790239375536528934b1dcf8e4f5ebe33df563b10c6e706de0f7959eedf142f3b44"' }>
                                        <li class="link">
                                            <a href="injectables/FranchiseeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FranchiseeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HomeModule.html" data-type="entity-link" >HomeModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' : 'data-target="#xs-components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' :
                                            'id="xs-components-links-module-HomeModule-19ef962a2e4b1ae1aa16315e02237a35b36c8ae94dc2ac2822bed4453f6e240dc06c51f467fda64edd89f8dfd1ddbda194c500ab61aab9e696457e65084f0bac"' }>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutsModule.html" data-type="entity-link" >LayoutsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PrincipalModule.html" data-type="entity-link" >PrincipalModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PrincipalModule-824b0ed78e88e4790ae677bddf5628aa2c3d30dbd7b7e489bc977bedff901e4b4c8a59dfefd04498e3ee746bf33d5b7544279c6cc2c388e1ac5c9ec275e521af"' : 'data-target="#xs-components-links-module-PrincipalModule-824b0ed78e88e4790ae677bddf5628aa2c3d30dbd7b7e489bc977bedff901e4b4c8a59dfefd04498e3ee746bf33d5b7544279c6cc2c388e1ac5c9ec275e521af"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PrincipalModule-824b0ed78e88e4790ae677bddf5628aa2c3d30dbd7b7e489bc977bedff901e4b4c8a59dfefd04498e3ee746bf33d5b7544279c6cc2c388e1ac5c9ec275e521af"' :
                                            'id="xs-components-links-module-PrincipalModule-824b0ed78e88e4790ae677bddf5628aa2c3d30dbd7b7e489bc977bedff901e4b4c8a59dfefd04498e3ee746bf33d5b7544279c6cc2c388e1ac5c9ec275e521af"' }>
                                            <li class="link">
                                                <a href="components/PageNotFoundComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PageNotFoundComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrincipalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrincipalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileModule.html" data-type="entity-link" >ProfileModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' : 'data-target="#xs-components-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' :
                                            'id="xs-components-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' : 'data-target="#xs-injectables-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' :
                                        'id="xs-injectables-links-module-ProfileModule-accdf0478751992d7e86cd4527d30cafc73ab7a084f3710b9754ddb30dae9f64343f698f96a68a4c3839c9fad4f043a2e3d9dbf36a8ed9162db8777c5e689fcf"' }>
                                        <li class="link">
                                            <a href="injectables/ProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/RecipeManagementModule.html" data-type="entity-link" >RecipeManagementModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' : 'data-target="#xs-components-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' :
                                            'id="xs-components-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' }>
                                            <li class="link">
                                                <a href="components/IngredientComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IngredientComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/IngredientTypeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >IngredientTypeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipeDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecipesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TabsComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' : 'data-target="#xs-injectables-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' :
                                        'id="xs-injectables-links-module-RecipeManagementModule-f499ab6b3ada1adfffcc7440a22dbe3ed7f7cec9747e63bad45bab2529beb7e75e7e0cff8dc75a551f224ebde30c4c3ac3a530106ce2b377775de55e4cd303f1"' }>
                                        <li class="link">
                                            <a href="injectables/RecipeService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecipeService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' : 'data-target="#xs-components-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' :
                                            'id="xs-components-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' : 'data-target="#xs-injectables-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' :
                                        'id="xs-injectables-links-module-UsersModule-7cdba0179f296dee246f21f93c6b9383be2611d1adba9b643d51fe72aad908e94c43d0e4f3a6a3ca4e650d7c28ddb9fbb84170d36ded44e9ea540570831f32dd"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AddressService.html" data-type="entity-link" >AddressService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorHttpService.html" data-type="entity-link" >ErrorHttpService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FranchiseeService.html" data-type="entity-link" >FranchiseeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientService.html" data-type="entity-link" >IngredientService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IngredientTypeService.html" data-type="entity-link" >IngredientTypeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoadingService.html" data-type="entity-link" >LoadingService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link" >LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MessagesService.html" data-type="entity-link" >MessagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RecipeService.html" data-type="entity-link" >RecipeService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ScheduleService.html" data-type="entity-link" >ScheduleService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidebarService.html" data-type="entity-link" >SidebarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserEffects.html" data-type="entity-link" >UserEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ApiTokenInterceptorService.html" data-type="entity-link" >ApiTokenInterceptorService</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/HttpErrorInterceptor.html" data-type="entity-link" >HttpErrorInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/IsAuthenticatedGuard.html" data-type="entity-link" >IsAuthenticatedGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsUnauthenticatedGuard.html" data-type="entity-link" >IsUnauthenticatedGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AccessTokenModel.html" data-type="entity-link" >AccessTokenModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AppState.html" data-type="entity-link" >AppState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Autorisation.html" data-type="entity-link" >Autorisation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Diner.html" data-type="entity-link" >Diner</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ErrorDataHttp.html" data-type="entity-link" >ErrorDataHttp</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Franchisee.html" data-type="entity-link" >Franchisee</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/FranchiseeRecipe.html" data-type="entity-link" >FranchiseeRecipe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Friday.html" data-type="entity-link" >Friday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Ingredient.html" data-type="entity-link" >Ingredient</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IngreType.html" data-type="entity-link" >IngreType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Lunch.html" data-type="entity-link" >Lunch</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Monday.html" data-type="entity-link" >Monday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Picture.html" data-type="entity-link" >Picture</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Recipe.html" data-type="entity-link" >Recipe</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/RecipeType.html" data-type="entity-link" >RecipeType</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Saturday.html" data-type="entity-link" >Saturday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Schedule.html" data-type="entity-link" >Schedule</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Sunday.html" data-type="entity-link" >Sunday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Thursday.html" data-type="entity-link" >Thursday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tuesday.html" data-type="entity-link" >Tuesday</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserState.html" data-type="entity-link" >UserState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Wednesday.html" data-type="entity-link" >Wednesday</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});