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
                                            'data-target="#components-links-module-AuthModule-84d91d439bd2fc99368d1a6da0813e7ce9d3c2be3636abff7cbd9705cd0b3234b668ac65f2aed39176d1e3c7f120efeeb79ea38ee67705f2f60d986cfb6451fd"' : 'data-target="#xs-components-links-module-AuthModule-84d91d439bd2fc99368d1a6da0813e7ce9d3c2be3636abff7cbd9705cd0b3234b668ac65f2aed39176d1e3c7f120efeeb79ea38ee67705f2f60d986cfb6451fd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AuthModule-84d91d439bd2fc99368d1a6da0813e7ce9d3c2be3636abff7cbd9705cd0b3234b668ac65f2aed39176d1e3c7f120efeeb79ea38ee67705f2f60d986cfb6451fd"' :
                                            'id="xs-components-links-module-AuthModule-84d91d439bd2fc99368d1a6da0813e7ce9d3c2be3636abff7cbd9705cd0b3234b668ac65f2aed39176d1e3c7f120efeeb79ea38ee67705f2f60d986cfb6451fd"' }>
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
                                            'data-target="#components-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' : 'data-target="#xs-components-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' :
                                            'id="xs-components-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' }>
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
                                        'data-target="#injectables-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' : 'data-target="#xs-injectables-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' :
                                        'id="xs-injectables-links-module-FranchiseeModule-2a8ad95d8f7827173e35597c9a6019eefba14350078aed9095a8b3ed86b7d8af557e738e5e20956f2c5f6cbb0cd5d0e398676696ebf1705c9716e2ebcf3e37aa"' }>
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
                                            'data-target="#components-links-module-HomeModule-354412705e222d3691379f021fc5e826661a3362012a50b703556b582f129ea1e370aef07f913e007fb491bf822323551a62700fdefd600c13e8b0841105cd1e"' : 'data-target="#xs-components-links-module-HomeModule-354412705e222d3691379f021fc5e826661a3362012a50b703556b582f129ea1e370aef07f913e007fb491bf822323551a62700fdefd600c13e8b0841105cd1e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-HomeModule-354412705e222d3691379f021fc5e826661a3362012a50b703556b582f129ea1e370aef07f913e007fb491bf822323551a62700fdefd600c13e8b0841105cd1e"' :
                                            'id="xs-components-links-module-HomeModule-354412705e222d3691379f021fc5e826661a3362012a50b703556b582f129ea1e370aef07f913e007fb491bf822323551a62700fdefd600c13e8b0841105cd1e"' }>
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
                                            'data-target="#components-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' : 'data-target="#xs-components-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' :
                                            'id="xs-components-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' }>
                                            <li class="link">
                                                <a href="components/ProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfileComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' : 'data-target="#xs-injectables-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' :
                                        'id="xs-injectables-links-module-ProfileModule-d75d0adb0cc07ee8c220954dda750a16d1c4a3bf082e199a6dfeafd32cfb5e5d5a95c79e4d7931df2dc01575921011817540aa108dc711a9c2e78bdd747ef657"' }>
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
                                            'data-target="#components-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' : 'data-target="#xs-components-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' :
                                            'id="xs-components-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' }>
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
                                        'data-target="#injectables-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' : 'data-target="#xs-injectables-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' :
                                        'id="xs-injectables-links-module-RecipeManagementModule-f3f5baf15d544eb52e048e24cbc39f8ba0987be0f46c69c21b078122c5c404a36ff5b1952cf862cf429c8977582f887575d52d09bfc067f52d1c358476b78818"' }>
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
                                            'data-target="#components-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' : 'data-target="#xs-components-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' :
                                            'id="xs-components-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' }>
                                            <li class="link">
                                                <a href="components/UsersComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' : 'data-target="#xs-injectables-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' :
                                        'id="xs-injectables-links-module-UsersModule-5a38700bf755f2089cc9f70e9600bb17d7c474b576d3112f1a3aaaccdbf09e91d5e5fbdf4998b49d08edecfa1690315cc970ae1fc8164b9d4f8caeadddd3fe19"' }>
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
                                <a href="interfaces/AppState-1.html" data-type="entity-link" >AppState</a>
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
                                <a href="interfaces/Role.html" data-type="entity-link" >Role</a>
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