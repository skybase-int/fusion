import type { ActorSocialDto, EcosystemActor, Scope, TeamType } from '@ses/core/models/dto/teamsDTO';

export class EcosystemActorBuilder {
  private readonly _ecosystemActor: EcosystemActor;

  constructor() {
    this._ecosystemActor = {
      id: '',
      code: '',
      name: '',
      type: '',
      image: '',
      category: [] as string[],
      scopes: [] as Scope[],
      socialMediaChannels: [] as ActorSocialDto[],
    };
  }

  withId(id: string): EcosystemActorBuilder {
    this._ecosystemActor.id = id;
    return this;
  }

  withCode(code: string): EcosystemActorBuilder {
    this._ecosystemActor.code = code;
    return this;
  }

  withName(name: string): EcosystemActorBuilder {
    this._ecosystemActor.name = name;
    return this;
  }

  withType(type: TeamType): EcosystemActorBuilder {
    this._ecosystemActor.type = type;
    return this;
  }

  withImage(image: string): EcosystemActorBuilder {
    this._ecosystemActor.image = image;
    return this;
  }

  addCategory(category: string): EcosystemActorBuilder {
    this._ecosystemActor.category.push(category);
    return this;
  }

  addScope(scope: Scope): EcosystemActorBuilder {
    this._ecosystemActor.scopes.push(scope);
    return this;
  }

  withSocials(socialMediaChannels: ActorSocialDto): EcosystemActorBuilder {
    this._ecosystemActor.socialMediaChannels.push(socialMediaChannels);
    return this;
  }

  build(): EcosystemActor {
    return this._ecosystemActor;
  }
}
